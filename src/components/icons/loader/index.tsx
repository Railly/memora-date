import { SVGProps } from "react";

export default function Loader(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="lucide lucide-loader-2"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M21 12a9 9 0 11-6.219-8.56"></path>
    </svg>
  );
}
