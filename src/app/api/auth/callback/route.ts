import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

export async function GET(request: NextRequest) {
  const reqUrl = new URL(request.url);
  const code = reqUrl.searchParams.get("code");

  try {
    if (code) {
      const supabase = createRouteHandlerClient<Database>({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
    }
  } catch (error) {
    console.error(error);
  }

  const redirectURl = reqUrl.origin + "/dashboard";
  return NextResponse.redirect(redirectURl);
}
