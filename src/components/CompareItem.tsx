import Image from "next/image";
import React from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { useCompare } from "@/context/CompareContext";
interface Props {
  product: Product;
  [key: string]: any;
}

export default function CompareItem({ product, ...props }: Props) {
  const { removeCompare } = useCompare();
  return (
    <div
      {...props}
      className="flex flex-col relative items-center shadow h-[130px]"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.image}`}
        width={150}
        height={100}
        alt=""
        className=""
      />
      <h4 className="w-[300px] px-4 text-center text-sm overflow-hidden text-ellipsis whitespace-nowrap">
        {product.product_name}
      </h4>
      <IoMdRemoveCircleOutline
        className="absolute right-2 text-2xl cursor-pointer text-red-700"
        onClick={() => removeCompare(product.id)}
      />
    </div>
  );
}
