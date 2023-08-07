import { CreateEventSchema } from "@/schemas/create-event.schema";
import { HttpError } from "../errors";
import { ClientServiceApi } from "./blueprint";
import { uploadFile } from "@/lib/storage.helpers";
import { CreateContactParams } from "@/lib/form.types";

class ClientContactService extends ClientServiceApi {
  async getContacts() {
    try {
      const response = await fetch("/api/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
      }
      return response.json();
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async createContact({ contact, user_id }: CreateContactParams) {
    try {
      if (!contact.selectedContact && contact.image) {
        const image = await uploadFile({
          supabase: this.supabase,
          bucket: "profiles",
          filepath: contact.full_name,
          file: contact.image,
          userId: user_id,
        });
        contact.image = image.path;
      }
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact,
          user_id,
        }),
      });
      if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
      }
      return response.json();
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
}

export default ClientContactService;
