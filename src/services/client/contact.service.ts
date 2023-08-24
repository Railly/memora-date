import { ContactColumns } from "@/lib/entities.types";
import {
  CreateContactParams,
  DeleteContactParams,
  UpdateContactParams,
} from "@/lib/form.types";
import { deleteFiles, uploadFile } from "@/lib/storage.helpers";
import { clientRequest } from "../utils";
import { ClientServiceApi } from "./blueprint";

class ClientContactService extends ClientServiceApi {
  async getContacts() {
    return clientRequest("/api/contacts", {
      method: "GET",
    });
  }

  async createContact(params: CreateContactParams | null) {
    if (!params) return;
    const { contact, user_id } = params;
    if (!contact.selectedContact && contact.image) {
      contact.image = await this.uploadContactImage(
        contact.full_name,
        contact.image,
        user_id
      );
    }

    return clientRequest("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact,
        user_id,
      }),
    });
  }

  async searchContact({
    searchTerm,
    column,
  }: {
    searchTerm: string;
    column: ContactColumns;
  }) {
    return clientRequest("/api/contacts/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        column,
        searchTerm,
      }),
    });
  }

  async updateContact({ contact, user_id }: UpdateContactParams) {
    // If the user has selected a new image, upload it and delete the old one
    if (
      !contact.selectedContact &&
      contact.image &&
      typeof contact.image !== "string"
    ) {
      if (contact.oldPath) {
        await this.deleteContactImage(contact.oldPath);
      }
      contact.image = await this.uploadContactImage(
        contact.full_name,
        contact.image,
        user_id
      );
    }

    return clientRequest("/api/contacts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact,
        user_id,
      }),
    });
  }

  async deleteContact({ contact_id, image_url }: DeleteContactParams) {
    if (image_url) {
      await this.deleteContactImage(image_url);
    }

    return clientRequest("/api/contacts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact_id,
      }),
    });
  }

  async uploadContactImage(filepath: string, image: File, user_id: string) {
    const imageFile = await uploadFile({
      supabase: this.supabase,
      bucket: "profiles",
      filepath,
      file: image,
      userId: user_id,
    });
    return imageFile.path;
  }

  async deleteContactImage(filepath: string) {
    await deleteFiles({
      supabase: this.supabase,
      bucket: "profiles",
      filepath: [filepath],
    });
  }
}

export default ClientContactService;
