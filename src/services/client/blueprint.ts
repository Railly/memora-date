import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export class ClientServiceApi {
  public supabase;

  constructor() {
    this.supabase = createClientComponentClient<Database>();
  }
}
