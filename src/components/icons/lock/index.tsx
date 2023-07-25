import { SVGProps } from "react";

export default function Lock(props: SVGProps<SVGSVGElement>) {
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
      className="icon icon-tabler icon-tabler-lock-square"
      viewBox="0 0 24 24"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M8 12a1 1 0 011-1h6a1 1 0 011 1v3a1 1 0 01-1 1H9a1 1 0 01-1-1zM10 11V9a2 2 0 114 0v2"></path>
      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2z"></path>
    </svg>
  );
}
