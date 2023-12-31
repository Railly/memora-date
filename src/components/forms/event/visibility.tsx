import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LockOpen2Icon, LockClosedIcon } from "@radix-ui/react-icons";

interface IVisibilityProps {
  isPublic: boolean;
  onChange: (selected: boolean) => void;
}

export const Visibility: React.FC<IVisibilityProps> = ({
  isPublic,
  onChange,
}) => {
  const toggleVisibility = () => onChange(!isPublic);

  return (
    <Button
      type="button"
      onClick={toggleVisibility}
      variant={isPublic ? "input-green" : "input-pink"}
      className={cn(
        {
          "text-emerald-500 hover:bg-emerald-500/50 hover:text-foreground":
            isPublic,
          "text-pink-500 hover:bg-pink-500/50 hover:text-foreground": !isPublic,
        },
        "stroke-current"
      )}
    >
      {isPublic ? (
        <LockOpen2Icon className="w-4 h-4 mr-2" />
      ) : (
        <LockClosedIcon className="w-4 h-4 mr-2" />
      )}
      {isPublic ? "Public" : "Private"}
    </Button>
  );
};
