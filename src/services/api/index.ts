import { IServiceApi } from "../interfaces";
import ServerAuthService from "./auth.service";

class ServerApiProvider implements IServiceApi<"server"> {
  public auth;

  constructor() {
    this.auth = new ServerAuthService();
  }
}

const serverApiProvider = new ServerApiProvider();

export default serverApiProvider;
