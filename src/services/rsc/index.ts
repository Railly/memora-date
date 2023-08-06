import { IServiceApi } from "../interfaces";
import RscAuthService from "./auth.service";
import RscContactService from "./contact.service";
import RscEventService from "./event.service";

class RscApiProvider implements IServiceApi<"rsc"> {
  public reminder = null;
  public event;
  public auth;
  public contact;

  constructor({ cookies }: { cookies: any }) {
    this.event = new RscEventService({ cookies });
    this.auth = new RscAuthService({ cookies });
    this.contact = new RscContactService({ cookies });
  }
}

export default RscApiProvider;
