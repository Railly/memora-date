import { RscServiceApi } from "./blueprint";

class RscProfileService extends RscServiceApi {
  constructor({ cookies }: { cookies: any }) {
    super({ cookies });
  }

  async getAvatar() {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();

    return session;
  }
}

export default RscProfileService;
