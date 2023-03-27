import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";
import IconButton from "./IconButton";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { HiXMark } from "react-icons/hi2";

export const TableCell = ({ children }: any) => {
  return (
    <div className="py-4 flex justify-center items-center">{children}</div>
  );
};

export const TableRow = ({ children }: any) => {
  return <div className="py-1 flex justify-between">{children}</div>;
};

export const HeaderWishList = () => {
  return (
    <div className="hidden md:grid grid-cols-4 bg-[#F7941D] text-sm uppercase  text-white border border-[#F7941D]">
      <TableCell>Product</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Unit Price</TableCell>
      <TableCell>Action</TableCell>
    </div>
  );
};

export default function WishListItem({ item, ...props }: any) {
  const { deleteWishListItem } = useShoppingCart();
  return (
    <div {...props} className="hidden md:block">
      <div className="grid grid-cols-4 border border-gray-100">
        <TableCell>
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.product.image}`}
            width={100}
            height={100}
            alt=""
          />
        </TableCell>
        <TableCell>{item.product.product_name}</TableCell>
        <TableCell>{item.product.selling_price}$</TableCell>
        <TableCell>
          <IconButton
            className="bg-transparent hover:bg-primary"
            onClick={() => deleteWishListItem(item.id)}
          >
            <MdDelete />
          </IconButton>
        </TableCell>
      </div>
    </div>
  );
}

export function CartItemWishListMobile({ item, ...props }: any) {
  const { deleteWishListItem } = useShoppingCart();
  return (
    <div {...props} className="md:hidden">
      <div className="grid grid-cols-12 py-4 border-b border-gray-100 relative">
        <div className="col-span-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.product.image}`}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="col-span-8 flex flex-col">
          <h6 className="text-sm">{item.product.product_name}</h6>
          <div className="flex text-sm">
            <del className="mr-4">{item.product.original_price}$</del>
            <span className="text-red-600">{item.product.selling_price}</span>
          </div>
          <HiXMark
            className="absolute right-1 top-3"
            onClick={(e: any) => deleteWishListItem(item.id)}
          />
        </div>
      </div>
    </div>
  );
}
