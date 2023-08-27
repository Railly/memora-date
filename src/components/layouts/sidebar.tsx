"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn, getImageUrl, getInitials } from "@/lib/utils";
import clientApiProvider from "@/services/client";
import { Session } from "@supabase/supabase-js";
import {
  IconAddressBook,
  IconBrandGithub,
  IconBrandTwitter,
  IconHome,
  IconLoader,
  IconLogout2,
  IconMessageCircle2,
  IconMoon,
  IconSpeakerphone,
  IconUserCircle,
} from "@tabler/icons-react";
import { useTheme } from "@wits/next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoMemora from "../icons/logo-memora";
import { SheetClose, SheetContent } from "../ui/sheet";
import { useToast } from "../ui/use-toast";

interface SidebarProps {
  className?: string;
  session: Session | null;
  withinSheet?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  session,
  withinSheet = true,
  className,
}) => {
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
    <ContentWrapper
      className={cn("w-3/4 sm:max-w-[18rem]", className)}
      withinSheet={withinSheet}
    >
      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex flex-col gap-3">
          {!withinSheet && (
            <Link className="ml-1 mb-4" href="/dashboard">
              <LogoMemora className="w-auto h-7" />
            </Link>
          )}
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
              <div className="w-[12ch] lg:w-[22ch] flex flex-col justify-center">
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
            <h2 className="text-sm font-medium text-foreground/80">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-2">
              <CloseWrapper withinSheet={withinSheet}>
                <Button
                  variant={path === "/dashboard" ? "secondary" : "outline"}
                  className={cn("justify-start h-12")}
                  asChild
                >
                  <Link href="/dashboard">
                    <span className="flex items-center gap-x-2">
                      <IconHome />
                      Home
                    </span>
                  </Link>
                </Button>
              </CloseWrapper>
              <CloseWrapper withinSheet={withinSheet}>
                <Button
                  variant={path === "/events/create" ? "secondary" : "outline"}
                  className={cn("justify-start h-12")}
                  asChild
                >
                  <Link href="/events/create">
                    <span className="flex items-center gap-x-2">
                      <IconSpeakerphone />
                      Create Event
                    </span>
                  </Link>
                </Button>
              </CloseWrapper>
              <CloseWrapper withinSheet={withinSheet}>
                <Button
                  variant={path === "/contacts" ? "secondary" : "outline"}
                  className={cn("justify-start h-12")}
                  asChild
                >
                  <Link href="/contacts">
                    <span className="flex items-center gap-x-2">
                      <IconAddressBook /> View Contacts
                    </span>
                  </Link>
                </Button>
              </CloseWrapper>
              <CloseWrapper withinSheet={withinSheet}>
                <Button
                  variant={path === "/profile" ? "secondary" : "outline"}
                  className={cn("justify-start h-12")}
                  asChild
                >
                  <Link href="/profile">
                    <span className="flex items-center gap-x-2">
                      <IconUserCircle />
                      View profile
                    </span>
                  </Link>
                </Button>
              </CloseWrapper>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium text-foreground/80">
              Contact us
            </h2>
            <CloseWrapper withinSheet={withinSheet}>
              <Button variant="outline" className="justify-start h-12" asChild>
                <Link href="https://twitter.com/raillyhugo" target="_blank">
                  <span className="flex items-center gap-x-2">
                    <IconBrandTwitter /> Twitter
                  </span>
                </Link>
              </Button>
            </CloseWrapper>
            <CloseWrapper withinSheet={withinSheet}>
              <Button variant="outline" className="justify-start h-12" asChild>
                <Link
                  href="https://github.com/Railly/memora-date"
                  target="_blank"
                >
                  <span className="flex items-center gap-x-2">
                    <IconBrandGithub /> Github
                  </span>
                </Link>
              </Button>
            </CloseWrapper>
            <CloseWrapper withinSheet={withinSheet}>
              <Button variant="outline" className="justify-start h-12" asChild>
                <Link href="mailto:raillyhugo@gmail.com" target="_blank">
                  <span className="flex items-center gap-x-2">
                    <IconMessageCircle2 /> Send Feedback
                  </span>
                </Link>
              </Button>
            </CloseWrapper>
          </div>
        </div>
        <div>
          <Separator className="w-full mb-3" />
          <div className="flex flex-col gap-2">
            <CloseWrapper withinSheet={withinSheet}>
              <Button
                variant="destructive"
                className="justify-start h-12"
                onClick={handleLogout}
              >
                <span className="flex gap-x-2">
                  <IconLogout2 /> Logout
                </span>
              </Button>
            </CloseWrapper>
            <div className="flex items-center justify-start h-12 px-4 py-2 text-base rounded-md bg-muted">
              <span className="flex items-center justify-between w-full">
                <div className="flex gap-x-2">
                  <IconMoon />
                  {withinSheet ? (
                    <span>Dark Mode</span>
                  ) : (
                    <>
                      <span className="hidden lg:inline-flex">Dark Mode</span>
                      <span className="inline-flex lg:hidden">Dark</span>
                    </>
                  )}
                </div>
                <Switch
                  onCheckedChange={(value) =>
                    setTheme(value ? "dark" : "light")
                  }
                  checked={theme === "dark"}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

function CloseWrapper({
  children,
  withinSheet,
}: {
  children: React.ReactNode;
  withinSheet?: boolean;
}) {
  if (!withinSheet) return children;
  return <SheetClose asChild>{children}</SheetClose>;
}

function ContentWrapper({
  children,
  withinSheet,
  className,
}: {
  children: React.ReactNode;
  withinSheet?: boolean;
  className?: string;
}) {
  if (!withinSheet) return <div className={className}>{children}</div>;
  return <SheetContent className={className}>{children}</SheetContent>;
}

export default Sidebar;
