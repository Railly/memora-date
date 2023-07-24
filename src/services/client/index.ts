import { IServiceApi } from "../interfaces";
import ClientAuthService from "./auth.service";

class ClientApiProvider implements IServiceApi<"client"> {
  public auth;

  constructor() {
    this.auth = new ClientAuthService();
  }
}

const clientApiProvider = new ClientApiProvider();

export default clientApiProvider;
