import { useCompare } from "@/context/CompareContext";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { MdAdd, MdCompare } from "react-icons/md";
import Button from "./Button";
import ProductQuickView from "./ProductQuickView";

export default function CardProduct({ data, compareIcon, ...props }: any) {
  const { addToCart, addToWishList } = useShoppingCart();
  const { addCompare } = useCompare();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickViewClose = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <div
      {...props}
      className="bg-white w-full h-full border border-gray-200 rounded-md overflow-hidden shadow"
    >
      <Link href={`/collections/${data.category.slug}/${data.slug}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${data.image}`}
          width={400}
          height={185}
          alt=""
          className="w-full h-auto"
        />
      </Link>
      <div className="px-4 py-2">
        <div>
          <Link
            href={`/collections/${data.category.slug}/${data.slug}`}
            className="block whitespace-nowrap overflow-hidden text-blue-700 text-ellipsis"
          >
            {data.product_name}
          </Link>
          <div className="flex font-bold mt-2">
            <span className="text-red-700">{data.selling_price}$</span>
            <del className="text-gray-500 ml-4">{data.original_price}$</del>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex ">
            <button
              className="text-red-700 text-2xl hover:bg-primary p-2 rounded-full"
              onClick={() => addToWishList(data)}
            >
              <AiOutlineHeart />
            </button>
            <button
              className="text-red-700 text-2xl hover:bg-primary p-2 rounded-full hidden md:block"
              onClick={() => setIsQuickViewOpen(true)}
            >
              <AiFillEye />
            </button>
           {compareIcon && <button
              className="text-gray-700 text-2xl hover:bg-primary p-2 rounded-full hidden lg:block"
              onClick={() => addCompare(data)}
            >
              <MdCompare />
            </button>} 
          </div>
          <div>
            <Button
              variant="outlined"
              className="px-2 py-[2px]"
              onClick={() => addToCart(data, 1)}
            >
              <MdAdd className="text-blue-700 text-2xl" />
            </Button>
          </div>
        </div>
      </div>

      {/* modal */}
      <ProductQuickView
        product={data}
        isOpen={isQuickViewOpen}
        onRequestClose={handleQuickViewClose}
      />
    </div>
  );
}
