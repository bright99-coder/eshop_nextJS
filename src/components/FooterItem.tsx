import Link from "next/link";
import React from "react";

export default function FooterItem({ title, href, className }: FooterItem) {
  return (
    <Link
      className={`text-[#AEB4BE] hover:text-white block my-2 ${className}`}
      href={href}
    >
      {title}
    </Link>
  );
}
