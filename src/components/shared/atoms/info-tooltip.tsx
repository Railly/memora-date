import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconInfoCircle } from "@tabler/icons-react";

interface IInfoTooltipProps {
  className?: string;
  content?: React.ReactNode;
}

export const InfoTooltip: React.FC<IInfoTooltipProps> = ({
  className,
  content,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button" className={className} {...props}>
          <IconInfoCircle size={16} />
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
