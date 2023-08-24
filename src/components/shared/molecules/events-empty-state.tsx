import { Button } from "@/components/ui/button";
import { IconNewsOff } from "@tabler/icons-react";
import Link from "next/link";

const EventsEmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-2 w-full border border-form-stroke/20 bg-muted rounded-lg p-6">
      <IconNewsOff size={35} />
      <span className="text-2xl font-bold text-center">No upcoming events</span>
      <span className="text-center">Create an event to see it here</span>
      <Button variant="secondary" className="justify-start" asChild>
        <Link href="/events/create">Go to event creator</Link>
      </Button>
    </div>
  );
};

export default EventsEmptyState;
