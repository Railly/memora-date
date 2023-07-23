"use client";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = zod.object({
  email: zod.string().email({
    message: "Please enter a valid email",
  }),
  password: zod
    .string()
    .min(10, { message: "Password must be at least 10 characters long" }),
});

type LoginForm = zod.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const supabase = createClientComponentClient();
  // const supabase = createClientComponentClient<Database>()

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    handleSignIn(data);
  };

  const handleSignUp = async (data: LoginForm) => {
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

  const handleSignIn = async (data: LoginForm) => {
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
