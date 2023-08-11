"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema, signInSchema } from "@/schemas/auth.schema";
import clientApiProvider from "@/services/client";
import LogoMemora from "@/components/icons/logo-memora";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Google from "@/components/icons/google";
import GitHub from "@/components/icons/github";
import { useState } from "react";
import { IconLoader2, IconLock, IconAt } from "@tabler/icons-react";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

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

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await clientApiProvider.auth.signInWithEmailAndPassword(
        data
      );
      if (response.error) {
        console.log({ response });
        toast({
          title: response.error.message,
          variant: "success",
        });
        return;
      }
      const redirectTo = searchParams.get("redirectTo") || "/dashboard";
      router.push(redirectTo);
    } catch (error: any) {
      console.log({ error });
      toast({
        title: error.message,
        variant: "danger",
      });
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await clientApiProvider.auth.signInWithProvider(
        "google",
        searchParams.get("redirectTo") || "/dashboard"
      );
      if (response.ok) {
        console.log({ response });
        router.push(response.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const response = await clientApiProvider.auth.signInWithProvider(
        "github",
        searchParams.get("redirectTo") || "/dashboard"
      );
      if (response.ok) {
        console.log({ response });
        router.push(response.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen dark:bg-black">
      <div className="flex flex-col items-center mx-4 w-[20.625rem]">
        <LogoMemora />
        <p className="py-8 text-3xl font-bold text-center text-white">
          Login to your Account
        </p>
        <form
          className="flex flex-col w-full gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="relative">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email Address"
              withIcon={<IconAt />}
              {...register("email", { required: true })}
              variant={errors.email ? "error" : "default"}
              className="mt-1"
            />
            {errors.email && (
              <p className="absolute text-xs text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your Password"
              withIcon={<IconLock />}
              {...register("password", { required: true })}
              variant={errors.password ? "error" : "default"}
              className="mt-1"
            />
            {errors.password && (
              <p className="absolute text-xs text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="relative mt-3">
            {isLoading && (
              <IconLoader2 className="absolute w-4 h-4 mr-2 transition ease-in-out animate-spin inset-x-32" />
            )}
            Login
          </Button>
        </form>
        <div className="flex flex-row items-center justify-between w-full my-4">
          <Separator className="w-[45%] border bg-zinc-500" />
          <p className="font-semibold text-zinc-500">or</p>
          <Separator className="w-[45%] border bg-zinc-500" />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Button
            className="h-10 font-medium text-white bg-button-google hover:bg-button-google/90"
            disabled={isLoading}
            type="button"
            onClick={handleGoogleSignIn}
          >
            <Google className="mr-3" />
            Continue with Google
          </Button>
          <Button
            className="h-10 text-white bg-button-github hover:bg-button-github/90"
            disabled={isLoading}
            onClick={handleGithubSignIn}
            type="button"
          >
            <GitHub className="mr-3" />
            Continue with GitHub
          </Button>
          <p className="py-2 text-base font-semibold text-center">
            <span className="text-zinc-500">
              Don´t have an account yet?{` `}
            </span>
            <Link href={"/sign-up"} className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
