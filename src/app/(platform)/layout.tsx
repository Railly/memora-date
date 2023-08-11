import Header from "@/components/layouts/header";
import RscApiProvider from "@/services/rsc";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rscApiProvider = new RscApiProvider({ cookies });
  const session = await rscApiProvider.auth.getSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <>
      <Header />
      <main className="p-3">{children}</main>
    </>
  );
}
