"use client";
import LogoMemora from "@/components/icons/logo-memora";
import { IconMenuDeep } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between w-full px-5 py-3 border-b border-gray/10 backdrop-blur-md md:hidden">
      <Link href="/dashboard">
        <LogoMemora className="w-auto h-7" />
      </Link>
      <SheetTrigger asChild>
        <Button
          title="Menu"
          variant="icon"
          type="button"
          className="p-1 hover:bg-foreground/20"
        >
          <IconMenuDeep />
        </Button>
      </SheetTrigger>
    </div>
  );
};

export default Header;
