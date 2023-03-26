import React from "react";
import IconButton from "./IconButton";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import NavbarItem from "./NavbarItem";
import Link from "next/link";
import SearchWrapper from "./SearchWrapper";
import { CiUser } from "react-icons/ci";
import Button from "./Button";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaJediOrder } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useAuth } from "@/context/AuthContext";
import useClickOutside from "@/hooks/useClickOutside";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartQuantity } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // const handleClickOutside = () => setIsOpen(false);
  // useClickOutside(ref, handleClickOutside);

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
          <IconButton href="/cart" className="relative">
            <BsHandbag />
            <span className="absolute -right-1 top-0 bg-orange-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
              {cartQuantity}
            </span>
          </IconButton>
          {user != null ? (
            <div className="relative">
              <div ref={ref} onClick={() => setIsOpen(!isOpen)}>
                <IconButton>
                  <CiUser />
                </IconButton>
              </div>
              {isOpen && (
                <div className="bg-white rounded-md absolute top-full border border-gray-200 right-0 shadow mt-3 flex flex-col z-20">
                  <Button
                    href="/profile"
                    variant="startIcon"
                    icons={<IoInformationCircleOutline />}
                  >
                    Profile
                  </Button>
                  <Button
                    href="/orders"
                    variant="startIcon"
                    icons={<FaJediOrder />}
                  >
                    My Orders
                  </Button>
                  <Button
                    variant="startIcon"
                    icons={<IoLogOutOutline />}
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <IconButton href="/login">
              <FiLogIn />
            </IconButton>
          )}
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
