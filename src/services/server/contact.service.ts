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
}

export default ServerContactService;
