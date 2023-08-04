"use client";
import { Button } from "@/components/ui/button";
import {
  IconX,
  IconUserCircle,
  IconSpeakerphone,
  IconAddressBook,
  IconBrandTwitter,
  IconBrandGithub,
  IconLogout2,
  IconSun,
  IconMessageCircle2,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import clientApiProvider from "@/services/client";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isOpen: Boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await clientApiProvider.auth.signOut();
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  const toggleHeaderButton = {
    hidden: !isOpen,
  };

  const toggleSidebarButton = {
    "translate-x-0": isOpen,
    "translate-x-full": !isOpen,
  };

  return (
    <div className="absolute top-0 w-full">
      <div
        className={cn(
          "transition-all duration-500 fixed top-0 z-[60] w-full h-screen bg-slate-900/60",
          toggleHeaderButton
        )}
      />
      <div
        className={cn(
          "border-l border-gray/10 z-[70] transition top-0 ease-in-out duration-500 fixed right-0 flex flex-col justify-between h-screen p-3 bg-black w-60",
          toggleSidebarButton
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="relative flex items-center justify-between w-full">
            <div className="flex min-w-full gap-x-2">
              <div className="items-center w-10 h-10">
                <Avatar>
                  <AvatarImage src="" alt="avatar" />
                  <AvatarFallback>HU</AvatarFallback>
                </Avatar>
              </div>
              <div className="w-[16ch]">
                <p className="overflow-hidden text-lg font-bold overflow-ellipsis whitespace-nowrap">
                  Railly Hugo
                </p>
                <p className="overflow-hidden text-xs font-medium text-gray-400 overflow-ellipsis whitespace-nowrap">
                  railly.hugo@unmsm.edu.pe
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="icon"
              className="absolute right-0 p-0 hover:bg-gray-700/30"
              onClick={toggleSidebar}
            >
              <IconX color="white" />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium text-gray-300">Settings</h2>
            <Button variant="sidebar" className="justify-start h-12" asChild>
              <Link href="/profile">
                <span className="flex gap-x-2">
                  <IconUserCircle color="white" />
                  Profile
                </span>
              </Link>
            </Button>
            <Button variant="sidebar" className="justify-start h-12" asChild>
              <Link href="/events">
                <span className="flex gap-x-2">
                  <IconSpeakerphone color="white" /> Events
                </span>
              </Link>
            </Button>
            <Button variant="sidebar" className="justify-start h-12" asChild>
              <Link href="/contacts">
                <span className="flex gap-x-2">
                  <IconAddressBook color="white" /> Contacts
                </span>
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium text-gray-300">Contact us</h2>
            <Button variant="sidebar" className="justify-start h-12" asChild>
              <Link href="https://twitter.com/raillyhugo" target="_blank">
                <span className="flex gap-x-2">
                  <IconBrandTwitter color="white" /> Twitter
                </span>
              </Link>
            </Button>
            <Button variant="sidebar" className="justify-start h-12" asChild>
              <Link
                href="https://github.com/Railly/memora-date"
                target="_blank"
              >
                <span className="flex gap-x-2">
                  <IconBrandGithub color="white" /> Github
                </span>
              </Link>
            </Button>
            <Button variant="sidebar" className="justify-start h-12" asChild>
              <Link href="mailto:raillyhugo@gmail.com" target="_blank">
                <span className="flex gap-x-2">
                  <IconMessageCircle2 color="white" /> Send Feedback
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="">
          <Separator className="w-full mb-2 border bg-zinc-500" />
          <div className="flex flex-col gap-2">
            <Button
              variant="sidebarDestructive"
              className="justify-start h-12"
              onClick={handleLogout}
            >
              <span className="flex gap-x-2">
                <IconLogout2 color="white" /> Logout
              </span>
            </Button>
            <div className="flex items-center justify-start h-12 px-4 py-2 text-base text-white rounded-md bg-memora-gray hover:bg-memora-gray/90">
              <span className="flex items-center justify-between w-full">
                <div className="flex gap-x-2">
                  <IconSun color="white" /> Ligth Mode
                </div>{" "}
                <Switch />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
