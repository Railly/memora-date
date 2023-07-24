"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
export default function DashBoardPage() {
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();
  // const user = supabase.auth.getUser();

  useEffect(() => {
    (async () => {
      const user = await supabase.auth.getUser();
      setUser(user.data.user?.user_metadata);
      console.log({ user });
    })();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{user?.email}</h2>
      <h3>{user?.name}</h3>
    </div>
  );
}
