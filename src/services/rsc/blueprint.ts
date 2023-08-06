import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export class RscServiceApi {
  public supabase;

  constructor({ cookies }: { cookies: any }) {
    this.supabase = createServerComponentClient<Database>({ cookies });
  }
}
