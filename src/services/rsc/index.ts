import { IServiceApi } from "../interfaces";
import RscAuthService from "./auth.service";
import RscContactService from "./contact.service";
import RscEventService from "./event.service";
import RscProfileService from "./profile.service";

class RscApiProvider implements IServiceApi<"rsc"> {
  public reminder = null;
  public event;
  public auth;
  public contact;
  public profile;

  constructor({ cookies }: { cookies: any }) {
    this.event = new RscEventService({ cookies });
    this.auth = new RscAuthService({ cookies });
    this.contact = new RscContactService({ cookies });
    this.profile = new RscProfileService({ cookies });
  }
}

export default RscApiProvider;
