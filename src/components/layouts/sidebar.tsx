"use client";
import { Button } from "@/components/ui/button";
import {
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
import { Session } from "@supabase/supabase-js";
import { getInitials } from "@/lib/utils";
import { IconLoader } from "@tabler/icons-react";
import { getImageUrl } from "@/lib/utils";
import { useTheme } from "@wits/next-themes";

interface SidebarProps {
  session: Session;
}

const Sidebar: React.FC<SidebarProps> = ({ session }) => {
  const { toast } = useToast();

  const { setTheme, theme } = useTheme();

  const router = useRouter();

  const path = usePathname();

  const image = session?.user.user_metadata.avatar_url;

  const encodedImage = image ? getImageUrl(image) : undefined;

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

  const userName =
    session?.user.user_metadata.full_name ?? session?.user.user_metadata.name;

  return (
    <SheetContent className="w-3/4 sm:max-w-[18rem]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3">
          <div className="relative flex items-center justify-between w-full">
            <div className="flex min-w-full gap-x-2">
              <div className="items-center w-10 h-10">
                <Avatar className="border-2 border-opacity-50 border-memora-gray">
                  <AvatarImage src={encodedImage} alt="avatar" />
                  <AvatarFallback>
                    {encodedImage !== undefined ? (
                      <div className="animate-spin">
                        <IconLoader />
                      </div>
                    ) : (
                      getInitials(userName)
                    )}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="w-[22ch] flex flex-col justify-center">
                <p className="overflow-hidden text-lg font-bold leading-tight overflow-ellipsis whitespace-nowrap">
                  {session?.user.user_metadata.full_name}
                </p>
                <p className="overflow-hidden text-xs font-medium leading-tight text-foreground/80 overflow-ellipsis whitespace-nowrap">
                  {session?.user.user_metadata.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium text-foreground/80">Settings</h2>
            <SheetClose asChild>
              <Button
                variant={path === "/profile" ? "default-2" : "outline"}
                className={cn("justify-start h-12")}
                asChild
              >
                <Link href="/profile">
                  <span className="flex gap-x-2">
                    <IconUserCircle />
                    Profile
                  </span>
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant={path === "/events" ? "default-2" : "outline"}
                className={cn("justify-start h-12")}
                asChild
              >
                <Link href="/events">
                  <span className="flex gap-x-2">
                    <IconSpeakerphone /> Events
                  </span>
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant={path === "/contacts" ? "default-2" : "outline"}
                className={cn("justify-start h-12")}
                asChild
              >
                <Link href="/contacts">
                  <span className="flex gap-x-2">
                    <IconAddressBook /> Contacts
                  </span>
                </Link>
              </Button>
            </SheetClose>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium text-foreground/80">
              Contact us
            </h2>
            <SheetClose asChild>
              <Button variant="outline" className="justify-start h-12" asChild>
                <Link href="https://twitter.com/raillyhugo" target="_blank">
                  <span className="flex gap-x-2">
                    <IconBrandTwitter /> Twitter
                  </span>
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="outline" className="justify-start h-12" asChild>
                <Link
                  href="https://github.com/Railly/memora-date"
                  target="_blank"
                >
                  <span className="flex gap-x-2">
                    <IconBrandGithub /> Github
                  </span>
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="outline" className="justify-start h-12" asChild>
                <Link href="mailto:raillyhugo@gmail.com" target="_blank">
                  <span className="flex gap-x-2">
                    <IconMessageCircle2 /> Send Feedback
                  </span>
                </Link>
              </Button>
            </SheetClose>
          </div>
        </div>
        <div>
          <Separator className="w-full mb-3" />
          <div className="flex flex-col gap-2">
            <SheetClose asChild>
              <Button
                variant="sidebar-destructive"
                className="justify-start h-12"
                onClick={handleLogout}
              >
                <span className="flex gap-x-2">
                  <IconLogout2 /> Logout
                </span>
              </Button>
            </SheetClose>
            <div className="flex items-center justify-start h-12 px-4 py-2 text-base rounded-md bg-muted">
              <span className="flex items-center justify-between w-full">
                <div className="flex gap-x-2">
                  <IconSun /> Light Mode
                </div>{" "}
                <Switch
                  onCheckedChange={(value) =>
                    setTheme(value ? "light" : "dark")
                  }
                  checked={theme === "light"}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
};

export default Sidebar;
