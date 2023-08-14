import AuthForm from "./sign-in.form";
import AuthBanner from "@/components/forms/auth/auth-banner";

export default async function LoginPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen dark:bg-black">
      <div className="flex flex-col items-center mx-4 w-[20.625rem]">
        <AuthBanner title="Login to your Account" />
        <AuthForm />
      </div>
    </div>
  );
}
