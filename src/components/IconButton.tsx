import Link from "next/link";
import React from "react";

export default function IconButton({
  children,
  className,
  href,
  ...props
}: any) {
  if (href) {
    return (
      <Link
        href={href}
        className={`w-10 h-10 select-none flex items-center justify-center rounded-full text-[#6F7072] text-xl bg-primary ml-2 cursor-pointer ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <div
      className={`w-10 h-10 select-none flex items-center justify-center rounded-full text-[#6F7072] text-xl bg-primary ml-2 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}
