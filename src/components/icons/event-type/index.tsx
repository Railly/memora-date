import {
  IconCake,
  IconSpeakerphone,
  IconBalloon,
  IconExclamationMark,
  IconMicrophone2,
  IconBriefcase2,
  IconWindmill,
  IconBrandTinder,
  IconConfetti,
} from "@tabler/icons-react";
import { rawVariants } from "@/components/ui/badge";

interface EventTypeUtils {
  [key: string]: {
    icon: JSX.Element;
    color: keyof typeof rawVariants;
  };
}

export const eventTypeUtils: EventTypeUtils = {
  birthday: { icon: <IconCake size={18} />, color: "purple" },
  anniversary: { icon: <IconConfetti size={18} />, color: "green" },
  party: { icon: <IconBalloon size={18} />, color: "orange" },
  holiday: { icon: <IconBalloon size={18} />, color: "blue" },
  exam: { icon: <IconExclamationMark size={18} />, color: "yellow" },
  date: { icon: <IconBrandTinder size={18} />, color: "pink" },
  concert: { icon: <IconMicrophone2 size={18} />, color: "purple" },
  work: { icon: <IconBriefcase2 size={18} />, color: "green" },
  generic: { icon: <IconSpeakerphone height={18} width={18} />, color: "blue" },
  default: { icon: <IconWindmill size={18} />, color: "default" },
};
