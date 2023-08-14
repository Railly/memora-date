import LogoMemora from "@/components/icons/logo-memora";

interface AuthBannerProps {
  title: string;
}

const AuthBanner: React.FC<AuthBannerProps> = ({ title }) => {
  return (
    <>
      <LogoMemora />
      <p className="py-8 text-3xl font-bold text-center text-white">{title}</p>
    </>
  );
};

export default AuthBanner;
