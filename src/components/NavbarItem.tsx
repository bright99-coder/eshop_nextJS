import Link from "next/link";
import React from "react";

export default function NavbarItem({ title, href }: NavbarItem) {
  return (
    <Link className="ml-7" href={href}>
      {title}
    </Link>
  );
}
