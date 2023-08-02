import { IServiceApi } from "../interfaces";
import ServerAuthService from "./auth.service";
import ServerEventService from "./event.service";
import ServerContactService from "./contact.service";

class ServerApiProvider implements IServiceApi<"server"> {
  public auth;
  public event;
  public contact;

  constructor({ cookies }: { cookies: any }) {
    this.auth = new ServerAuthService({ cookies });
    this.event = new ServerEventService({ cookies });
    this.contact = new ServerContactService({ cookies });
  }
}

export default ServerApiProvider;
