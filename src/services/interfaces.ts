/* Auth */
import ServerAuthService from "./server/auth.service";
import ClientAuthService from "./client/auth.service";
import RscAuthService from "./rsc/auth.service";
/* Event */
import RscEventService from "./rsc/event.service";
import ServerEventService from "./server/event.service";
import ClientEventService from "./client/event.service";
/* Contact */
import ServerContactService from "./server/contact.service";
import ClientContactService from "./client/contact.service";
import RscContactService from "./rsc/contact.service";
/* Reminder */
import ServerReminderService from "./server/reminder.service";
import ClientReminderService from "./client/reminder.service";
/* Storage */
// import StorageService from "./client/storage.service";

type ServiceType = "client" | "server" | "rsc";

export interface IServiceApi<T extends ServiceType> {
  auth: T extends "server"
    ? ServerAuthService
    : T extends "client"
    ? ClientAuthService
    : RscAuthService;
  event: T extends "rsc"
    ? RscEventService
    : T extends "server"
    ? ServerEventService
    : ClientEventService;
  contact: T extends "server"
    ? ServerContactService
    : T extends "client"
    ? ClientContactService
    : RscContactService;
  reminder: T extends "server"
    ? ServerReminderService
    : T extends "client"
    ? ClientReminderService
    : null | undefined;
  // storage: T extends "client" ? StorageService : null | undefined;
}
