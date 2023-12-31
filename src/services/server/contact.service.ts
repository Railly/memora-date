import { ContactColumns } from "@/lib/entities.types";
import { UpdateContactParams } from "@/lib/form.types";
import { contactServerError } from "../utils";
import { ServerServiceApi } from "./blueprint";
import { ContactSchema } from "@/schemas/contact.schema";

class ServerContactService extends ServerServiceApi {
  async getContacts() {
    try {
      const { error, data } = await this.supabase.from("contact").select("*");

      return { error, data };
    } catch (error) {
      return contactServerError(error);
    }
  }

  async createContact({
    contact,
    user_id,
  }: {
    contact: ContactSchema;
    user_id: string;
  }) {
    try {
      const { full_name, email, phone, image, isImported } = contact;
      const { error, data } = await this.supabase
        .from("contact")
        .insert([
          {
            full_name,
            user_id,
            email,
            phone,
            image_url: image,
            is_imported: isImported,
          },
        ])
        .select();

      return { error, data: data?.[0] };
    } catch (error) {
      return contactServerError(error);
    }
  }

  async searchTermInColumn({
    column,
    searchTerm,
  }: {
    column: ContactColumns;
    searchTerm: string;
  }) {
    try {
      const { data, error } = await this.supabase
        .from("contact")
        .select(`*`)
        .textSearch(`${column}`, `${searchTerm}`);

      return { data, error };
    } catch (error) {
      return contactServerError(error);
    }
  }

  async updateContact({ contact, user_id }: UpdateContactParams) {
    try {
      const { contact_id, full_name, email, phone, image } = contact;
      const { data, error } = await this.supabase
        .from("contact")
        .update({
          full_name,
          email,
          phone,
          image_url: image,
        })
        .eq("id", contact_id)
        .eq("user_id", user_id)
        .select();

      return { data, error };
    } catch (error) {
      return contactServerError(error);
    }
  }

  async deleteContact({ contact_id }: { contact_id: string }) {
    try {
      const { data, error } = await this.supabase
        .from("contact")
        .delete()
        .eq("id", contact_id)
        .select();

      return { data, error };
    } catch (error) {
      return contactServerError(error);
    }
  }
}

export default ServerContactService;
