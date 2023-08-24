import { profileServerError } from "../utils";
import { ServerServiceApi } from "./blueprint";
import { UpdateAvatarParams } from "@/lib/profile.types";

class ServerProfileService extends ServerServiceApi {
  async updateAvatar({ avatar }: UpdateAvatarParams) {
    try {
      const { image } = avatar;
      const { error, data } = await this.supabase.auth.updateUser({
        data: {
          avatar_url: image,
        },
      });
      return { data, error };
    } catch (error) {
      return profileServerError(error);
    }
  }
}

export default ServerProfileService;
