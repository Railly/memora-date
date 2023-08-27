import UpcomingEventSection from "@/components/dashboard/upcoming-event.section";
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
  const events = await rscApiProvider.event.getEvents();

  return (
    <>
      <Sheet>
        <Header />
        <Sidebar session={session} />
      </Sheet>
      <main className="min-h-screen p-3 sm:px-4 sm:py-6 sm:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(18vw,_0.5fr)_minmax(33vw,_1fr)_minmax(33vw,_1fr)] gap-6 h-full">
          <Sidebar
            className="hidden h-[95vh] md:max-w-full bg-card z-50 md:block w-full"
            session={session}
            withinSheet={false}
          />
          {children}
          <UpcomingEventSection events={events.data} count={events.count} />
        </div>
      </main>
    </>
  );
}
