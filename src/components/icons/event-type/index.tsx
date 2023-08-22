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
    className: string;
  };
}

export const eventTypeUtils: EventTypeUtils = {
  birthday: {
    icon: <IconCake size={18} />,
    color: "purple",
    className: "bg-memora-purple focus:bg-memora-purple",
  },
  anniversary: {
    icon: <IconConfetti size={18} />,
    color: "green",
    className: "bg-memora-green focus:bg-memora-green",
  },
  party: {
    icon: <IconBalloon size={18} />,
    color: "orange",
    className: "bg-memora-orange focus:bg-memora-orange",
  },
  holiday: {
    icon: <IconBalloon size={18} />,
    color: "blue",
    className: "bg-memora-blue focus:bg-memora-blue",
  },
  exam: {
    icon: <IconExclamationMark size={18} />,
    color: "yellow",
    className: "bg-memora-yellow focus:bg-memora-yellow",
  },
  date: {
    icon: <IconBrandTinder size={18} />,
    color: "pink",
    className: "bg-memora-pink focus:bg-memora-pink",
  },
  concert: {
    icon: <IconMicrophone2 size={18} />,
    color: "purple",
    className: "bg-memora-purple focus:bg-memora-purple",
  },
  work: {
    icon: <IconBriefcase2 size={18} />,
    color: "green",
    className: "bg-memora-green focus:bg-memora-green",
  },
  generic: {
    icon: <IconSpeakerphone height={18} width={18} />,
    color: "default",
    className: "bg-white focus:bg-white",
  },
  default: {
    icon: <IconWindmill size={18} />,
    color: "default",
    className: "bg-white focus:bg-white",
  },
};
