"use client";
import LogoMemora from "@/components/icons/logo-memora";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import User from "@/components/icons/user";
import At from "@/components/icons/at";
import Lock from "@/components/icons/lock";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import clientApiProvider from "@/services/client";
import { useToast } from "@/components/ui/use-toast";

export default function SignUpPage() {
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
  const router = useRouter();
  const { toast } = useToast();

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
      <div className="flex flex-col items-center w-80">
        <LogoMemora />
        <p className="py-8 text-3xl font-bold text-center text-white">
          Create your Account
        </p>
        <form
          className="flex flex-col w-full gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Full Name"
              withIcon={<User />}
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email Address"
              withIcon={<At />}
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your Password"
              withIcon={<Lock />}
              {...register("password", { required: true })}
            />
          </div>
          <p className="py-2 text-sm font-semibold text-center">
            <span className="text-zinc-500">Already have an account?{` `}</span>
            <Link href={"/sign-in"} className="text-blue-500">
              Log in
            </Link>
          </p>
          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
}
