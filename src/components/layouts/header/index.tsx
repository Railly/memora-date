"use client";
import LogoMemora from "@/components/icons/logo-memora";
import { IconMenuDeep } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Sidebar from "../sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between w-full px-5 py-3 border-b border-gray/10 backdrop-blur-xl bg-black/30">
        <LogoMemora className="w-auto h-7" />
        <Button
          variant="icon"
          type="button"
          className="p-0 hover:bg-gray-700/30"
          onClick={toggleSidebar}
        >
          <IconMenuDeep />
        </Button>
      </div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
