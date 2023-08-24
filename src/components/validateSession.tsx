"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ValidateSession = ({
  serverSession,
}: {
  serverSession: Session | null;
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session?.access_token, " <> ", serverSession?.access_token);
      if (session?.access_token !== serverSession?.access_token) {
        console.log(session?.access_token, " - ", serverSession?.access_token);
        router.refresh();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  return <></>;
};

export default ValidateSession;
