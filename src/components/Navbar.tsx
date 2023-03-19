import React from "react";
import IconButton from "./IconButton";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { BsSearch } from "react-icons/bs";
import NavbarItem from "./NavbarItem";
import Link from "next/link";
import SearchWrapper from "./SearchWrapper";

export default function Navbar() {
  return (
    <div className="px-5 md:px-10 lg:px-20 flex flex-col">
      <div className="flex justify-between py-2 md:py-4">
        <Link href="/" className="flex items-end text-2xl text-blue-600">
          ECOMERCE
        </Link>
        <SearchWrapper className="relative w-full md:w-2/4 h-searchWrapper max-w-lg hidden md:block" />
        <div className="flex">
          <IconButton href="/wishlist">
            <AiOutlineHeart />
          </IconButton>
          <IconButton href="/cart">
            <BsHandbag />
          </IconButton>
          <IconButton href="/login">
            <FiLogIn />
          </IconButton>
        </div>
      </div>
      <div className="hidden md:flex justify-end">
        <NavbarItem title="Home" href="/" />
        <NavbarItem title="Collections" href="/collections" />
        <NavbarItem title="Trending Product" href="/trending" />
        <NavbarItem title="Featured Product" href="/featured" />
      </div>
      <div className="">
        <SearchWrapper className="relative w-full h-searchWrapper md:hidden" />
      </div>
    </div>
  );
}
