import { RscServiceApi } from "./blueprint";

class RscAuthService extends RscServiceApi {
  constructor({ cookies }: { cookies: any }) {
    super({ cookies });
  }

  async getSession() {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();

    return session;
  }
}

export default RscAuthService;
