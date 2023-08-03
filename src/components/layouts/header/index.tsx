import LogoMemora from "@/components/icons/logo-memora";
import { IconMenuDeep } from "@tabler/icons-react";

const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between w-full px-5 py-3 border-b border-gray/10 backdrop-blur-xl bg-black/30">
      <LogoMemora className="w-auto h-7" />
      <IconMenuDeep />
    </div>
  );
};

export default Header;
