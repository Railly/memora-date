import { cookies } from "next/headers";
import NextEventSection from "@/components/dashboard/next-event.section";
import RscApiProvider from "@/services/rsc";
import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/atoms/FAB";

export default async function DashBoardPage() {
  const rscApiProvider = new RscApiProvider({ cookies });
  const events = await rscApiProvider.event.getEvents();
  const nextEvent = events.data?.shift();

  return (
    <>
      <NextEventSection event={nextEvent} />
      <FloatingActionButton to={ACTION_BUTTON_PATHS.EVENT_CREATOR} />
    </>
  );
}
