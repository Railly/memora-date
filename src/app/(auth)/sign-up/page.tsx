"use client";
import LogoMemora from "@/components/icons/logo-memora";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import clientApiProvider from "@/services/client";
import { useToast } from "@/components/ui/use-toast";
import { IconLoader2, IconLock, IconAt, IconUser } from "@tabler/icons-react";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    console.log(data);
    const response = await clientApiProvider.auth.signUpWithEmailAndPassword(
      data
    );
    if (!response.error) {
      router.push("/sign-in");
      toast({
        title: "Verify your account",
        description: "We've sent a confirmation email to your inbox.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen dark:bg-black">
      <div className="flex flex-col items-center mx-4 w-[20.625rem]">
        <LogoMemora />
        <p className="py-8 text-3xl font-bold text-center text-white">
          Create your Account
        </p>
        <form
          className="flex flex-col w-full gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Full Name"
              withIcon={<IconUser />}
              {...register("name", { required: true })}
              variant={errors.name ? "error" : "default"}
              className="mt-1"
            />
            {errors.name && (
              <p className="absolute text-xs text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div>
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
          <div>
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
          <Button type="submit" className="mt-3" disabled={isLoading}>
            {isLoading && (
              <IconLoader2 className="absolute w-4 h-4 mr-2 transition ease-in-out animate-spin inset-x-32" />
            )}
            Register
          </Button>
          <p className="py-2 text-base font-semibold text-center">
            <span className="text-zinc-500">Already have an account?{` `}</span>
            <Link href={"/sign-in"} className="text-blue-500">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
