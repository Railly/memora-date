import { IServiceApi } from "../interfaces";
import ClientAuthService from "./auth.service";
import ClientContactService from "./contact.service";
import ClientEventService from "./event.service";

class ClientApiProvider implements IServiceApi<"client"> {
  public auth;
  public event;
  public contact;

  constructor() {
    this.auth = new ClientAuthService();
    this.event = new ClientEventService();
    this.contact = new ClientContactService();
  }
}

const clientApiProvider = new ClientApiProvider();

export default clientApiProvider;
