import Link from "next/link";
import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { BiTrendingUp } from "react-icons/bi";
import { FaRegUser, FaJediOrder } from "react-icons/fa";
import { useRouter } from "next/router";

export default function NavMobile() {
  return (
    <div className="w-full h-16 bg-white shadow grid grid-cols-4">
      <NavbarItem href="/">
        <FaRegUser />
        Home
      </NavbarItem>
      <NavbarItem href="/collections">
        <BiCategoryAlt />
        Collections
      </NavbarItem>
      <NavbarItem href="/trending">
        <BiTrendingUp />
        Trending
      </NavbarItem>
      <NavbarItem href="/orders">
        <FaJediOrder />
        Orders
      </NavbarItem>
    </div>
  );
}

function NavbarItem({ children, href }: any) {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link
      className={`flex flex-col items-center justify-center ${
        isActive ? "text-blue-500" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
