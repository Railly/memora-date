"use client";
import AuthInputs from "@/components/forms/auth/auth-inputs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { SignUpSchema, signUpSchema } from "@/schemas/auth.schema";
import clientApiProvider from "@/services/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    setIsLoading(true);
    try {
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
    } catch (error: any) {
      toast({
        title: error.statusText,
        variant: "danger",
      });
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AuthInputs
          control={form.control}
          errors={form.formState.errors}
          isRegister
        />
        <Button type="submit" disabled={isLoading} className="relative mt-3">
          {isLoading && (
            <IconLoader2 className="absolute w-4 h-4 mr-2 transition ease-in-out left-28 animate-spin inset-x-32" />
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
    </Form>
  );
};

export default SignUpForm;
