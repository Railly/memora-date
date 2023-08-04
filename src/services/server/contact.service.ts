import { CreateEventSchema } from "@/schemas/create-event.schema";
import { CONTACT_ERROR } from "../constants";
import { ServerServiceApi } from "./blueprint";

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
}

export default ServerContactService;
