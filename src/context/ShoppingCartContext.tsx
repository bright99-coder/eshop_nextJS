import axios from "axios";
import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";
import swal from "sweetalert";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  totalPrice: number;
  cartItems: CartItem[];
  cartQuantity: number;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
  deleteCartItem: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleDecrement = (id: number) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        id === item.id
          ? {
              ...item,
              product_quantity:
                item.product_quantity - (item.product_quantity > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(id, "dec");
  };

  const handleIncrement = (id: number) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        id === item.id
          ? {
              ...item,
              product_quantity:
                item.product_quantity + (item.product_quantity < 10 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(id, "inc");
  };

  function updateCartQuantity(id: number, scope: string) {
    axios.put(`/api/cart-updatequantity/${id}/${scope}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      }
    });
  }

  const deleteCartItem = (id: number) => {
    axios.delete(`/api/delete-cartitem/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setCartItems(
          cartItems.filter(function (item) {
            return item.id !== id;
          })
        );
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  };
  const updateTotalPrice = (items: CartItem[]) => {
    const total = items.reduce(
      (acc, item) => acc + item.product.selling_price * item.product_quantity,
      0
    );
    setTotalPrice(total);
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.product_quantity + quantity,
    0
  );

  React.useEffect(() => {
    updateTotalPrice(cartItems);
  }, [cartItems]);

  return (
    <ShoppingCartContext.Provider
      value={{
        totalPrice,
        cartItems,
        cartQuantity,
        setCartItems,
        handleIncrement,
        handleDecrement,
        deleteCartItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
