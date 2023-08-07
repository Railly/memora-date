import LogoMemora from "@/components/icons/logo-memora";
import { IconArrowRight, IconError404 } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-2">
      <LogoMemora />
      <div className="flex items-center justify-center w-full gap-2 mt-4 text-memora-pink">
        <IconError404 size={40} className="stroke-current" />
        <h2 className="text-3xl ">Not Found</h2>
      </div>
      <p className="text-lg">Could not find requested resource</p>
      <Link
        className="inline-flex items-end text-lg underline text-memora-blue underline-offset-4 group"
        href="/dashboard"
      >
        <span>Go to Dashboard</span>
        <IconArrowRight
          size={24}
          className="stroke-current group-hover:animate-bounce"
        />
      </Link>
    </div>
  );
}
