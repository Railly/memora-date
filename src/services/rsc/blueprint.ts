import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cache } from "react";

export class RscServiceApi {
  public supabase;

  constructor({ cookies }: { cookies: any }) {
    this.supabase = cache(() => {
      const cookieStore = cookies();
      return createServerComponentClient({
        cookies: () => cookieStore,
      });
    })();
  }
}
