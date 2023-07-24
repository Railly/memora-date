import { SVGProps } from "react";

export default function At(props: SVGProps<SVGSVGElement>) {
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
      className="icon icon-tabler icon-tabler-at"
      viewBox="0 0 24 24"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M8 12a4 4 0 108 0 4 4 0 10-8 0"></path>
      <path d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-5.5 8.28"></path>
    </svg>
  );
}
