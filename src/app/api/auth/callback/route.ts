import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

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
  const lastLogoutFrom = reqUrl.searchParams.get("lastLogoutFrom");
  const redirectTargetPath = lastLogoutFrom || "/dashboard";
  const redirectUrl = new URL(redirectTargetPath, request.url);
  return NextResponse.redirect(redirectUrl);
}
