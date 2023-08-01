import { IServiceApi } from "../interfaces";
import ServerAuthService from "./auth.service";
import ServerEventService from "./event.service";

class ServerApiProvider implements IServiceApi<"server"> {
  public auth;
  public event;

  constructor({ cookies }: { cookies: any }) {
    this.auth = new ServerAuthService({ cookies });
    this.event = new ServerEventService({ cookies });
  }
}

export default ServerApiProvider;
