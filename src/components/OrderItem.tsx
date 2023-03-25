import Link from "next/link";
import React from "react";
import Button from "./Button";

interface Props {
    order: OrderItem;
    className?: string;
    [key: string]: any;
}

const Item = ({ children }: any) => {
  return (
    <div className="py-3 flex justify-center items-center text-sm">
      {children}
    </div>
  );
};

export const HeaderOrder = () => {
    return (
      <div className="hidden md:grid grid-cols-6 bg-[#F7941D] text-sm uppercase  text-white border border-[#F7941D]">
        <Item>Order Id</Item>
        <Item>Tracking No</Item>
        <Item>Payment Mode</Item>
        <Item>Order Date</Item>
        <Item>Status Message</Item>
        <Item>Action</Item>
      </div>
    );
  };

export default function OrderItem({ order, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={`grid-cols-6 border border-gray-100 hidden md:grid ${className}`}
    >
      <Item>{order.id}</Item>
      <Item>{order.tracking_no}</Item>
      <Item>{order.payment_mode}</Item>
      <Item>{order.created_at}</Item>
      <Item>{order.status_message}</Item>
      <Item>
        <Link href={`/orders/${order.id}`}>
          <Button variant="contained">View</Button>
        </Link>
      </Item>
    </div>
  );
}

export function OrderItemMobile({ order, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={`grid grid-cols-12 border-b border-gray-100 py-4 md:hidden ${className}`}
    >
      <div className="col-span-6">
        <p className="text-xs">{order.created_at}</p>
        <h6 className="text-sm my-2">
          Payment: <span className="uppercase">{order.payment_mode}</span>
        </h6>
        <Button variant="outlined">{order.status_message}</Button>
      </div>
      <div className="col-span-6 text-end">
        <p className="text-xs mb-9 text-red-600">{order.tracking_no}</p>
        <Link href={`/orders/${order.id}`}>
          <Button variant="contained">View</Button>
        </Link>
      </div>
    </div>
  );
}
