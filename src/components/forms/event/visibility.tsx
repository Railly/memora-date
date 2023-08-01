import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LockOpen2Icon, LockClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const Visibility: React.FC = () => {
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const toggleVisibility = () =>
    setVisibility((prev) => (prev === "public" ? "private" : "public"));

  return (
    <Button
      type="button"
      onClick={toggleVisibility}
      variant={visibility === "public" ? "input-green" : "input-pink"}
      className={cn(
        visibility === "public" ? "text-memora-green" : "text-memora-pink",
        "stroke-current"
      )}
    >
      {visibility === "public" ? (
        <LockOpen2Icon className="w-4 h-4 mr-2" />
      ) : (
        <LockClosedIcon className="w-4 h-4 mr-2" />
      )}
      {visibility === "public" ? "Public" : "Private"}
    </Button>
  );
};
