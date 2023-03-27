import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  product: Product;
}

export default function SearchItem({ product }: Props) {
  return (
    <Link
      href="/"
      className="grid grid-cols-12 bg-white my-2 hover:bg-gray-200 p-2 rounded-md overflow-hidden"
    >
      <div className="col-span-2 flex items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.image}`}
          width={100}
          height={100}
          alt=""
        />
      </div>
      <div className="col-span-10 px-4">
        <h4 className="text-blue-500 text-ellipsis overflow-hidden whitespace-nowrap">{product.product_name}</h4>
        <div className="flex">
          <span className="mr-4 text-red-600">{product.selling_price}$</span>
          <del className="text-gray-400">{product.original_price}$</del>
        </div>
      </div>
    </Link>
  );
}
