import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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
      <Sheet>
        <Header />
        <Sidebar session={session} />
      </Sheet>
      <main className="min-h-screen p-3 sm:px-4 sm:py-6 sm:pb-0">
        {children}
      </main>
    </>
  );
}
