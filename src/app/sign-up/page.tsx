"use client";
import LogoMemora from "@/components/icons/logo-memora";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import User from "@/components/icons/user";
import At from "@/components/icons/at";
import Lock from "@/components/icons/lock";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen dark:bg-black">
      <div className="flex flex-col items-center w-80">
        <LogoMemora />
        <p className="py-8 text-3xl font-bold text-center text-white">
          Create your Account
        </p>
        <form className="flex flex-col w-full gap-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Your Full Name"
              withIcon={<User />}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Your Email Address"
              withIcon={<At />}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Your Password"
              withIcon={<Lock />}
            />
          </div>
          <p className="py-2 text-sm font-semibold text-center">
            <span className="text-zinc-500">Already have an account?{` `}</span>
            <Link href={"/sign-in"} className="text-blue-500">
              Log in
            </Link>
          </p>
          <Button>Register</Button>
        </form>
      </div>
    </div>
  );
}
