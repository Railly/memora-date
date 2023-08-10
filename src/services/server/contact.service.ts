import { CreateEventSchema } from "@/schemas/create-event.schema";
import { CONTACT_ERROR } from "../constants";
import { ServerServiceApi } from "./blueprint";
import { ContactColumns } from "@/lib/entities.types";
import { UpdateContactParams } from "@/lib/form.types";

class ServerContactService extends ServerServiceApi {
  async getContacts() {
    try {
      const { error, data } = await this.supabase.from("contact").select("*");
      return { error, data };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          name: CONTACT_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
    }
  }

  async createContact({
    contact,
    user_id,
  }: {
    contact: CreateEventSchema["contact"];
    user_id: string;
  }) {
    try {
      const { full_name, email, phone, image } = contact;
      const { error, data } = await this.supabase
        .from("contact")
        .insert([
          {
            full_name,
            user_id,
            email,
            phone,
            image_url: image,
          },
        ])
        .select();

      return { error, data: data?.[0] };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          name: CONTACT_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
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
      console.error(error);
      return {
        data: null,
        error: {
          name: CONTACT_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
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
      console.log({ data, error });
      return { data, error };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          name: CONTACT_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
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
      console.error(error);
      return {
        data: null,
        error: {
          name: CONTACT_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
    }
  }
}

export default ServerContactService;
