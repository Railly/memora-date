/* Auth */
import ServerAuthService from "./server/auth.service";
import ClientAuthService from "./client/auth.service";
/* Event */
import RscEventService from "./rsc/event.service";
import ServerEventService from "./server/event.service";
import ClientEventService from "./client/event.service";
/* Contact */
import ServerContactService from "./server/contact.service";
import ClientContactService from "./client/contact.service";

type ServiceType = "client" | "server" | "rsc";

export interface IServiceApi<T extends ServiceType> {
  auth: T extends "server"
    ? ServerAuthService
    : T extends "client"
    ? ClientAuthService
    : null | undefined;
  event: T extends "rsc"
    ? RscEventService
    : T extends "server"
    ? ServerEventService
    : ClientEventService;
  contact: T extends "server" ? ServerContactService : ClientContactService;
}
