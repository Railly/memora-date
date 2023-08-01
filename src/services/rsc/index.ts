import { IServiceApi } from "../interfaces";
import RscEventService from "./event.service";

class RscApiProvider implements IServiceApi<"rsc"> {
  public auth = null;
  public event;

  constructor({ cookies }: { cookies: any }) {
    this.event = new RscEventService({ cookies });
  }
}

export default RscApiProvider;
