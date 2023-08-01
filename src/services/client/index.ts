import { IServiceApi } from "../interfaces";
import ClientAuthService from "./auth.service";
import ClientEventService from "./event.service";

class ClientApiProvider implements IServiceApi<"client"> {
  public auth;
  public event;

  constructor() {
    this.auth = new ClientAuthService();
    this.event = new ClientEventService();
  }
}

const clientApiProvider = new ClientApiProvider();

export default clientApiProvider;
