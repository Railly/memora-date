import { deleteFiles, uploadFile } from "@/lib/storage.helpers";
import { clientRequest } from "../utils";
import { ClientServiceApi } from "./blueprint";
import { UpdateAvatarParams } from "@/lib/profile.types";

class ClientProfileService extends ClientServiceApi {
  async updateAvatar({ avatar, user }: UpdateAvatarParams) {
    if (user?.avatar_url) {
      await this.deleteProfileImage(user.avatar_url);
    }

    if (user) {
      avatar.image = await this.uploadProfileImage(
        user?.full_name,
        avatar.image,
        user?.user_id
      );
    }

    return clientRequest("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  async uploadProfileImage(filepath: string, image: File, user_id: string) {
    const imageFile = await uploadFile({
      supabase: this.supabase,
      bucket: "profiles",
      filepath,
      file: image,
      userId: user_id,
    });
    return imageFile.path;
  }

  async deleteProfileImage(filepath: string) {
    await deleteFiles({
      supabase: this.supabase,
      bucket: "profiles",
      filepath: [filepath],
    });
  }
}

export default ClientProfileService;
