"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema, signInSchema } from "../schemas/auth.schema";
import clientApiProvider from "@/services/client";
import LogoMemora from "@/components/icons/logo-memora";
import At from "@/components/icons/at";
import Lock from "@/components/icons/lock";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Google from "@/components/icons/google";
import GitHub from "@/components/icons/github";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const supabase = createClientComponentClient();

  const onSubmit = async (data: SignInSchema) => {
    console.log(data);
    const response = await clientApiProvider.auth.signUpWithEmailAndPassword(
      data
    );

    console.log({ response });
  };

  const handleSignUp = async (data: SignInSchema) => {
    console.log("handleSignUp");
    const { email, password } = data;
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async (data: SignInSchema) => {
    console.log("handleSignIn");
    const { email, password } = data;
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    console.log("handleSignOut");
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen dark:bg-black">
      <div className="flex flex-col items-center w-80">
        <LogoMemora />
        <p className="py-8 text-3xl font-bold text-center text-white">
          Log In your Account
        </p>
        <form className="flex flex-col w-full gap-4">
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
            <span className="text-zinc-500">
              Don´t have an account yet?{` `}
            </span>
            <Link href={"/sign-up"} className="text-blue-500">
              Sign Up
            </Link>
          </p>
          <Button>Log In</Button>
        </form>
        <div className="flex flex-row items-center justify-between w-full my-4">
          <Separator className="w-[45%] border bg-zinc-500" />
          <p className="font-semibold text-zinc-500">or</p>
          <Separator className="w-[45%] border bg-zinc-500" />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Button className="h-10 font-medium text-white bg-button-google">
            <Google className="mr-3" />
            Continue with Google
          </Button>
          <Button className="h-10 text-white bg-button-github">
            <GitHub className="mr-3" />
            Continue with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
