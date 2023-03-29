import Image from "next/image";
import React from "react";

export const Item = ({ title, className, children }: any) => {
  return (
    <div className={`py-1 flex text-sm items-center ${className}`}>
      {title && <strong className="w-28">{title}</strong>}
      {children}
    </div>
  );
};

export const Header = ({ content, className }: any) => {
  return (
    <h3 className={`py-1 font-bold underline text-blue-500 ${className}`}>
      {content}
    </h3>
  );
};

export const HeaderOrderItemDetails = () => {
  return (
    <div className="hidden md:grid grid-cols-12 text-sm font-bold border border-gray-50">
      <ItemTable className="col-span-1">Item ID</ItemTable>
      <ItemTable className="col-span-2 justify-center">Image</ItemTable>
      <ItemTable className="col-span-4">Product</ItemTable>
      <ItemTable className="col-span-1 justify-center">Price</ItemTable>
      <ItemTable className="col-span-2 justify-center">Quantity</ItemTable>
      <ItemTable className="col-span-2 justify-end">Total</ItemTable>
    </div>
  );
};

export const ItemTable = ({ title, className, children }: any) => {
  return (
    <div className={`py-3 flex text-sm items-center ${className}`}>
      <strong className="mr-2">{title}</strong>
      {children}
    </div>
  );
};
interface Props {
  orderItem: OrderItemDetail;
  className?: string;
  [key: string]: any;
}

export default function OrderItemDetails({ orderItem, ...props }: Props) {
  return (
    <div {...props} className="hidden md:grid grid-cols-12 min-w-full">
      <ItemTable className="col-span-1">{orderItem.id}</ItemTable>
      <ItemTable className="col-span-2 justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${orderItem.product.image}`}
          width={50}
          height={50}
          alt={orderItem.product.product_name}
        />
      </ItemTable>
      <ItemTable className="col-span-4">
        {orderItem.product.product_name}
      </ItemTable>
      <ItemTable className="col-span-1 justify-center">
        {orderItem.product.selling_price}$
      </ItemTable>
      <ItemTable className="col-span-2 justify-center">
        {orderItem.quantity}
      </ItemTable>
      <ItemTable className="col-span-2 justify-end">
        {orderItem.price * orderItem.quantity}$
      </ItemTable>
    </div>
  );
}

export function OrderItemDetailsMobile({ orderItem, ...props }: Props) {
  return (
    <div {...props} key={orderItem.id} className="grid md:hidden grid-cols-12">
      <div className="col-span-3">
        <Image
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${orderItem.product.image}`}
          width={100}
          height={100}
          alt={orderItem.product.product_name}
        />
      </div>
      <div className="col-span-9">
        <Item>{orderItem.product.product_name}</Item>
        <Item className="justify-between">
          <span>Quantity:</span> x{orderItem.quantity}
        </Item>
        <Item className="justify-end">
          <del className="text-gray-400">
            {orderItem.product.original_price}$
          </del>
          <span className="text-red-700 ml-4">
            {orderItem.product.selling_price}$
          </span>
        </Item>
      </div>
    </div>
  );
}
