import useLocalStorage from "@/hooks/useLocalStorage";
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
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]> | any>;
  addToCart: (product: Product, quantity: number) => void;
  addToWishList: (product: Product) => void;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
  deleteCartItem: (id: number) => void;
  //WishList
  wishListItems: any;
  setWishListItems: React.Dispatch<React.SetStateAction<any[]> | any>;
  deleteWishListItem: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[] | any>(
    "shopping_cart",
    []
  );
  const [wishListItems, setWishListItems] = useLocalStorage<any[] | any>(
    "wishlist",
    []
  );

  const deleteWishListItem = (id: number) => {
    setWishListItems(
      wishListItems.filter(function (item: any) {
        return item.id !== id;
      })
    ); //cheat
    axios.delete(`/api/delete-wishitem/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.message);
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
    (quantity: number, item: CartItem) => item.product_quantity + quantity,
    0
  );

  React.useEffect(() => {
    updateTotalPrice(cartItems);
  }, [cartItems]);

  const addToWishList = ({ id }: Product) => {
    axios.post(`/api/add-to-wishlist`, { product_id: id }).then((res) => {
      if (res.data.status === 201) {
        //Created - Data Inserted
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        //Already added to cart
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        swal("Error", res.data.message, "warning");
      } else if (res.data.status === 404) {
        //Not Found
        swal("Warning", res.data.message, "error");
      }
    });
  };

  const addToCart = ({ id }: Product, quantity: number) => {
    const data = {
      product_id: id,
      product_color_name: "",
      product_quantity: quantity,
    };

    axios.post(`/api/add-to-cart`, data).then((res) => {
      if (res.data.status === 201) {
        //Created - Data Inserted
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        //Already added to cart
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        swal("Error", res.data.message, "warning");
      } else if (res.data.status === 404) {
        //Not Found
        swal("Warning", res.data.message, "error");
      }
    });
  };

  const handleDecrement = (id: number) => {
    setCartItems((cartItems: CartItem[]) =>
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
    setCartItems((cartItems: CartItem[]) =>
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
        console.log(res.data.message);
      }
    });
  }

  const deleteCartItem = (id: number) => {
    setCartItems(
      cartItems.filter(function (item: CartItem) {
        return item.id !== id;
      })
    ); //cheat
    axios.delete(`/api/delete-cartitem/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.message);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        totalPrice,
        cartItems,
        cartQuantity,
        setCartItems,
        addToCart,
        addToWishList,
        handleIncrement,
        handleDecrement,
        deleteCartItem,
        //wishlist
        wishListItems,
        setWishListItems,
        deleteWishListItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
