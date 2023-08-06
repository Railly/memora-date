import { RscServiceApi } from "./blueprint";

class RscContactService extends RscServiceApi {
  constructor({ cookies }: { cookies: any }) {
    super({ cookies });
  }

  async getContacts() {
    const contacts = await this.supabase
      .from("contact")
      .select("*")
      .order("full_name", { ascending: true });
    return contacts;
  }
}

export default RscContactService;
