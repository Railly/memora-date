import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IServiceApi } from "../interfaces";
import ClientAuthService from "./auth.service";
import ClientContactService from "./contact.service";
import ClientEventService from "./event.service";
import ClientReminderService from "./reminder.service";
import ClientProfileService from "./profile.service";

class ClientApiProvider implements IServiceApi<"client"> {
  public auth;
  public event;
  public contact;
  public reminder;
  public profile;
  // public storage;
  public supabase = createClientComponentClient();

  constructor() {
    this.auth = new ClientAuthService();
    this.event = new ClientEventService();
    this.contact = new ClientContactService();
    this.reminder = new ClientReminderService();
    this.profile = new ClientProfileService();
    // this.storage = new StorageService();
  }
}

const clientApiProvider = new ClientApiProvider();

export default clientApiProvider;
