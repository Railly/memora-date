"use client";
import LogoMemora from "@/components/icons/logo-memora";
import { siteConfig } from "@/config/site";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function GlobalError() {
  const randomDev =
    siteConfig.authors[Math.floor(Math.random() * siteConfig.authors.length)];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-2">
      <LogoMemora />
      <h2 className="text-3xl text-center my-4 text-memora-pink">
        Upss, something
        <br /> went <span className="font-semibold">wrong</span> on our side
      </h2>
      <div className="text-lg flex gap-4 flex-col items-center">
        <span>
          Looks like{" "}
          <a
            href={randomDev.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-end text-lg underline text-memora-blue underline-offset-4"
          >
            {randomDev.name}
          </a>{" "}
          is still debugging...
        </span>
        <Image
          className="rounded-full"
          src={`/images/${randomDev.name.toLowerCase().split(" ")[0]}.jpg`}
          alt={randomDev.name}
          width={100}
          height={100}
        />
      </div>
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
