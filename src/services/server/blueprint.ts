import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export class ServerServiceApi {
  public supabase;

  constructor({ cookies }: { cookies: any }) {
    this.supabase = createRouteHandlerClient<Database>({ cookies });
  }
}
