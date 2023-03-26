import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";

type OrderProviderProps = {
  children: ReactNode;
};

type OrderContext = {
  totalPrice: number;
  orderItems: OrderItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
};

const OrderContext = createContext({} as OrderContext);

export function useOrderContext() {
  return useContext(OrderContext);
}
export function OrderProvider({ children }: OrderProviderProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <OrderContext.Provider
      value={{
        totalPrice,
        orderItems,
        setOrderItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
