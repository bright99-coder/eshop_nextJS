import { useShoppingCart } from "@/context/ShoppingCartContext";
import Image from "next/image";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import Button from "./Button";
import IconButton from "./IconButton";
interface Props {
  item: CartItem;
  [key: string]: any;
}

export const TableCell = ({ children }: any) => {
  return (
    <div className="py-4 flex justify-center items-center">{children}</div>
  );
};

export const TableRow = ({ children }: any) => {
  return <div className="py-1 flex justify-between">{children}</div>;
};

export const HeaderCart = () => {
  return (
    <div className="hidden md:grid grid-cols-6 bg-[#F7941D] text-sm uppercase  text-white border border-[#F7941D]">
      <TableCell>Product</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Unit Price</TableCell>
      <TableCell>Quantity</TableCell>
      <TableCell>Total</TableCell>
      <TableCell>Action</TableCell>
    </div>
  );
};

export default function CartItem({ item, ...props }: Props) {
  const { handleIncrement, handleDecrement, deleteCartItem } =
    useShoppingCart();
  return (
    <div {...props} className="hidden md:block">
      <div className="grid grid-cols-6 border border-gray-100">
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
          <div className="flex justify-center items-center">
            <Button variant="outlined" onClick={() => handleDecrement(item.id)}>
              -
            </Button>
            <Button variant="outlined">{item.product_quantity}</Button>
            <Button variant="outlined" onClick={() => handleIncrement(item.id)}>
              +
            </Button>
          </div>
        </TableCell>
        <TableCell>{item.product_quantity * item.product.selling_price}$</TableCell>
        <TableCell>
          <IconButton
            className="bg-transparent hover:bg-primary"
            onClick={() => deleteCartItem(item.id)}
          >
            <MdDelete />
          </IconButton>
        </TableCell>
      </div>
    </div>
  );
}

export function CartItemMobile({ item, ...props }: Props) {
  const { handleIncrement, handleDecrement, deleteCartItem } =
    useShoppingCart();
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
          <div className="flex items-center mt-2">
            <Button
              className="py-1"
              variant="outlined"
              onClick={() => handleDecrement(item.id)}
            >
              -
            </Button>
            <Button className="py-1" variant="outlined">
              {item.product_quantity}
            </Button>
            <Button
              className="py-1"
              variant="outlined"
              onClick={() => handleIncrement(item.id)}
            >
              +
            </Button>
          </div>
          <HiXMark
            className="absolute right-1 top-3"
            onClick={(e: any) => deleteCartItem(item.id)}
          />
        </div>
      </div>
    </div>
  );
}
