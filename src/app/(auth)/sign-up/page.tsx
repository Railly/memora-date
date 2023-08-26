import SignUpForm from "./sign-up.form";
import AuthBanner from "@/components/forms/auth/auth-banner";

export default async function SignUpPage() {
  return (
    <div className="flex items-center justify-center w-screen h-[100dvh] dark:bg-black">
      <div className="flex flex-col items-center mx-4 w-[20.625rem]">
        <AuthBanner title="Create your Account" />
        <SignUpForm />
      </div>
    </div>
  );
}
