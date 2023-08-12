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
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { SheetClose, SheetContent } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { toast } = useToast();
  const router = useRouter();
  const path = usePathname();

  const handleLogout = async () => {
    try {
      const response = await clientApiProvider.auth.signOut();
      const redirectTo = response.data.redirectTo;
      if (redirectTo) {
        toast({
          title: "Logout",
          description: "You have been logged out.",
          variant: "success",
        });
        router.push(redirectTo);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleIsHighlight = (pathname: string) => {
    return pathname === path;
  };

  const highlightVariant = (route: string) => ({
    "bg-zinc-500 hover:bg-zinc-500/90": handleIsHighlight(route),
  });

  return (
    <SheetContent className="w-3/4 sm:max-w-[18rem]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3">
          <div className="relative flex items-center justify-between w-full">
            <div className="flex min-w-full gap-x-2">
              <div className="items-center w-10 h-10">
                <Avatar>
                  <AvatarImage src="" alt="avatar" />
                  <AvatarFallback>HU</AvatarFallback>
                </Avatar>
              </div>
              <div className="w-[16ch] flex flex-col justify-center">
                <p className="overflow-hidden text-lg font-bold leading-tight overflow-ellipsis whitespace-nowrap">
                  Railly Hugo
                </p>
                <p className="overflow-hidden text-xs font-medium leading-tight text-gray-400 overflow-ellipsis whitespace-nowrap">
                  railly.hugo@unmsm.edu.pe
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium text-gray-300">Settings</h2>
            <SheetClose asChild>
              <Button
                variant="sidebar"
                className={cn(
                  "justify-start h-12",
                  highlightVariant("/profile")
                )}
                asChild
              >
                <Link href="/profile">
                  <span className="flex gap-x-2">
                    <IconUserCircle color="white" />
                    Profile
                  </span>
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant="sidebar"
                className={cn(
                  "justify-start h-12",
                  highlightVariant("/events")
                )}
                asChild
              >
                <Link href="/events">
                  <span className="flex gap-x-2">
                    <IconSpeakerphone color="white" /> Events
                  </span>
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant="sidebar"
                className={cn(
                  "justify-start h-12",
                  highlightVariant("/contacts")
                )}
                asChild
              >
                <Link href="/contacts">
                  <span className="flex gap-x-2">
                    <IconAddressBook color="white" /> Contacts
                  </span>
                </Link>
              </Button>
            </SheetClose>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium text-gray-300">Contact us</h2>
            <SheetClose asChild>
              <Button variant="sidebar" className="justify-start h-12" asChild>
                <Link href="https://twitter.com/raillyhugo" target="_blank">
                  <span className="flex gap-x-2">
                    <IconBrandTwitter color="white" /> Twitter
                  </span>
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
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
            </SheetClose>
            <SheetClose asChild>
              <Button variant="sidebar" className="justify-start h-12" asChild>
                <Link href="mailto:raillyhugo@gmail.com" target="_blank">
                  <span className="flex gap-x-2">
                    <IconMessageCircle2 color="white" /> Send Feedback
                  </span>
                </Link>
              </Button>
            </SheetClose>
          </div>
        </div>
        <div className="">
          <Separator className="w-full mb-3" />
          <div className="flex flex-col gap-2">
            <SheetClose asChild>
              <Button
                variant="sidebar-destructive"
                className="justify-start h-12"
                onClick={handleLogout}
              >
                <span className="flex gap-x-2">
                  <IconLogout2 color="white" /> Logout
                </span>
              </Button>
            </SheetClose>
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
    </SheetContent>
  );
};

export default Sidebar;
