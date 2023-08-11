import RscApiProvider from "@/services/rsc";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rscApiProvider = new RscApiProvider({ cookies });
  const session = await rscApiProvider.auth.getSession();
  if (session) {
    redirect("/dashboard");
  }
  return <>{children}</>;
}
