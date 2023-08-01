import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export class ClientServiceApi {
  public supabase;

  constructor() {
    this.supabase = createClientComponentClient<Database>();
  }
}
