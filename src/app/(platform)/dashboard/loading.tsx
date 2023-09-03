import NextEventSection from "@/components/dashboard/next-event.section";
import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/atoms/FAB";

export default function DashboardLoading() {
  return (
    <>
      <NextEventSection event={null} />
      <FloatingActionButton to={ACTION_BUTTON_PATHS.EVENT_CREATOR} />
    </>
  );
}
