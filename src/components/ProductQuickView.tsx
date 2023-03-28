import { useShoppingCart } from "@/context/ShoppingCartContext";
import Image from "next/image";
import { useState } from "react";
import ReactModal from "react-modal";
import Button from "./Button";
interface Props {
  product: Product;
  isOpen: boolean;
  onRequestClose: any;
}

const ProductQuickView = ({ product, isOpen, onRequestClose }: Props) => {
  const { addToWishList, addToCart } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-[800px] mx-auto bg-white rounded-lg overflow-hidden shadow-lg outline-none transition-all"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20"
      ariaHideApp={false}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-5 p-4 flex items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.image}`}
            width={400}
            height={400}
            alt=""
            className="w-full h-auto"
          />
        </div>
        <div className="col-span-7 p-4">
          <h2 className="text-xl overflow-hidden text-ellipsis">
            {product.product_name}
          </h2>
          <h4 className="my-2 flex items-center">
            Brand:{" "}
            <Image
              src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.brand.image}`}
              width={30}
              height={30}
              alt=""
              className="ml-2"
            />
          </h4>
          <h3 className="text-2xl text-red-600">{product.selling_price}$</h3>
          <div>Stock Available</div>
          <div className="flex justify-start items-center my-4">
            <Button variant="outlined" onClick={handleDecrement}>
              -
            </Button>
            <Button variant="outlined">{quantity}</Button>
            <Button variant="outlined" onClick={handleIncrement}>
              +
            </Button>
          </div>
          <div className="flex mb-4">
            <Button
              className="mr-4"
              variant="contained"
              onClick={() => addToCart(product, quantity)}
            >
              Add to cart
            </Button>
            <Button variant="outlined" onClick={() => addToWishList(product)}>
              Add to wishlist
            </Button>
          </div>
          <p className="text-sm">{product.description}</p>
        </div>
      </div>
    </ReactModal>
  );
};

export default ProductQuickView;
