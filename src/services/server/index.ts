import { IServiceApi } from "../interfaces";
import ServerAuthService from "./auth.service";
import ServerEventService from "./event.service";
import ServerContactService from "./contact.service";
import ServerReminderService from "./reminder.service";
import ServerProfileService from "./profile.service";

class ServerApiProvider implements IServiceApi<"server"> {
  public auth;
  public event;
  public contact;
  public reminder;
  public profile;

  constructor({ cookies }: { cookies: any }) {
    this.auth = new ServerAuthService({ cookies });
    this.event = new ServerEventService({ cookies });
    this.contact = new ServerContactService({ cookies });
    this.reminder = new ServerReminderService({ cookies });
    this.profile = new ServerProfileService({ cookies });
  }
}

export default ServerApiProvider;
