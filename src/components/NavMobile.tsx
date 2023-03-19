import Link from "next/link";
import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export default function NavMobile() {
  return (
    <div className="w-full h-16 bg-white shadow grid grid-cols-4">
      <Link href="/collections" className="flex flex-col items-center justify-center">
        <BiCategoryAlt />
        Collections
      </Link>
      <Link href="/trending" className="flex flex-col items-center justify-center">
        <BiTrendingUp />
        Trending
      </Link>
      <Link href="/featured" className="flex flex-col items-center justify-center">
        <MdOutlineFeaturedPlayList />
        Featured
      </Link>
      <Link href="/profile" className="flex flex-col items-center justify-center">
        <FaRegUser />
        Profile
      </Link>
    </div>
  );
}
