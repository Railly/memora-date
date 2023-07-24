"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema, signInSchema } from "../../schemas/auth.schema";
import clientApiProvider from "@/services/client";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          className="text-black"
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <Button type="submit">Submit</Button>
      <Button type="button" onClick={() => handleSubmit(handleSignUp)}>
        Sign Up
      </Button>
      <Button type="button" onClick={() => handleSubmit(handleSignIn)}>
        Sign In
      </Button>
      <Button type="button" onClick={handleSignOut}>
        Sign Out
      </Button>
    </form>
  );
}
