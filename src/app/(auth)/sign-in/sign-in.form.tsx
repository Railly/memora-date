"use client";
import AuthInputs from "@/components/forms/auth/auth-inputs";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { SignInSchema, signInSchema } from "@/schemas/auth.schema";
import clientApiProvider from "@/services/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import Google from "@/components/icons/google";
import GitHub from "@/components/icons/github";
import Link from "next/link";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<{
    login: boolean;
    google: boolean;
    github: boolean;
  }>({
    login: false,
    google: false,
    github: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading({ ...isLoading, login: true });
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
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading({ ...isLoading, google: true });
    try {
      const response = await clientApiProvider.auth.signInWithProvider(
        "google",
        searchParams.get("redirectTo") || "/dashboard"
      );
      if (response.ok) {
        router.push(response.data.url);
      }
    } catch (error) {
      console.log(error);
      setIsLoading({ ...isLoading, google: false });
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading({ ...isLoading, github: true });
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
      setIsLoading({ ...isLoading, github: false });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AuthInputs control={form.control} errors={form.formState.errors} />
        <div className="flex flex-row items-center justify-between w-full">
          <Button
            type="submit"
            disabled={isLoading.login || isLoading.google || isLoading.github}
            className="relative w-full mt-3"
          >
            {isLoading.login && !(isLoading.google && isLoading.github) && (
              <IconLoader2 className="absolute w-4 h-4 mr-2 transition ease-in-out animate-spin inset-x-32" />
            )}
            <span>Login</span>
          </Button>
        </div>
      </form>
      <div className="flex flex-row items-center justify-between w-full my-4">
        <Separator className="w-[45%] border bg-zinc-500" />
        <p className="font-semibold text-zinc-500">or</p>
        <Separator className="w-[45%] border bg-zinc-500" />
      </div>
      <div className="flex flex-col w-full gap-3">
        <Button
          className="relative flex h-10 gap-3 font-medium text-white bg-google hover:bg-google/90"
          disabled={isLoading.login || isLoading.google || isLoading.github}
          type="button"
          onClick={handleGoogleSignIn}
        >
          {isLoading.google && !(isLoading.login && isLoading.github) ? (
            <IconLoader2 className="w-4 h-4 transition ease-in-out left-20 animate-spin inset-x-32" />
          ) : (
            <Google />
          )}
          <span>Continue with Google</span>
        </Button>
        <Button
          className="relative flex h-10 gap-3 text-white bg-github hover:bg-github/90"
          disabled={isLoading.login || isLoading.google || isLoading.github}
          onClick={handleGithubSignIn}
          type="button"
        >
          {isLoading.github && !(isLoading.login && isLoading.google) ? (
            <IconLoader2 className="w-4 h-4 transition ease-in-out left-20 animate-spin inset-x-32" />
          ) : (
            <GitHub />
          )}
          <span>Continue with GitHub</span>
        </Button>
        <p className="py-2 text-base font-semibold text-center">
          <span className="text-zinc-500">Don´t have an account yet?{` `}</span>
          <Link href={"/sign-up"} className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default AuthForm;
