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
    className:
      "bg-memora-purple focus:bg-memora-purple hover:bg-memora-purple/80 focus-visible:bg-memora-purple/80",
  },
  anniversary: {
    icon: <IconConfetti size={18} />,
    color: "green",
    className:
      "bg-memora-green focus:bg-memora-green hover:bg-memora-green/80 focus-visible:bg-memora-green/80",
  },
  party: {
    icon: <IconBalloon size={18} />,
    color: "orange",
    className:
      "bg-memora-orange focus:bg-memora-orange hover:bg-memora-orange/80 focus-visible:bg-memora-orange/80",
  },
  holiday: {
    icon: <IconBalloon size={18} />,
    color: "blue",
    className:
      "bg-memora-blue focus:bg-memora-blue hover:bg-memora-blue/80 focus-visible:bg-memora-blue/80",
  },
  exam: {
    icon: <IconExclamationMark size={18} />,
    color: "yellow",
    className:
      "bg-memora-yellow focus:bg-memora-yellow hover:bg-memora-yellow/80 focus-visible:bg-memora-yellow/80",
  },
  date: {
    icon: <IconBrandTinder size={18} />,
    color: "pink",
    className:
      "bg-memora-pink focus:bg-memora-pink hover:bg-memora-pink/80 focus-visible:bg-memora-pink/80",
  },
  concert: {
    icon: <IconMicrophone2 size={18} />,
    color: "purple",
    className:
      "bg-memora-purple focus:bg-memora-purple hover:bg-memora-purple/80 focus-visible:bg-memora-purple/80",
  },
  work: {
    icon: <IconBriefcase2 size={18} />,
    color: "green",
    className:
      "bg-memora-green focus:bg-memora-green hover:bg-memora-green/80 focus-visible:bg-memora-green/80",
  },
  generic: {
    icon: <IconSpeakerphone height={18} width={18} />,
    color: "default",
    className:
      "bg-foreground text-background focus:bg-foreground hover:bg-foreground/80 focus-visible:bg-foreground/80",
  },
  default: {
    icon: <IconWindmill size={18} />,
    color: "default",
    className:
      "bg-foreground text-background focus:bg-foreground hover:bg-foreground/80 focus-visible:bg-foreground/80",
  },
  secondary: {
    icon: <IconWindmill size={18} />,
    color: "secondary",
    className:
      "bg-secondary text-secondary-foreground focus:bg-secondary hover:bg-secondary/80 focus-visible:bg-secondary/80",
  },
} as const;
