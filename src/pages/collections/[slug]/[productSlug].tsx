import Button from "@/components/Button";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { getCategories } from "@/lib/getCategories";
import SectionProduct from "@/components/SectionProduct";
import { useShoppingCart } from "@/context/ShoppingCartContext";

export default function ProductDetail({
  product,
  relativeProductOfCategory,
  relativeProductOfBrand,
}: any) {
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
    <div>
      <div className="min-h-[48px] bg-primary px-5 md:px-10 lg:px-20 flex items-center">
        <Link className="text-blue-500 underline" href="/collections">
          Collections
        </Link>{" "}
        /
        <Link className="text-blue-500 underline" href="/collections">
          Laptop
        </Link>{" "}
        /<span>{product.product_name}</span>
      </div>
      <div className="px-5 md:px-10 lg:px-20 mt-4 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-5">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.image}`}
            width={500}
            height={500}
            className="w-full h-auto"
            alt=""
          />
        </div>
        <div className="col-span-12 lg:col-span-7 lg:pl-10">
          <h2 className="text-2xl overflow-hidden text-ellipsis">
            {product.product_name}
          </h2>
          <h4 className="my-4">Brand: Dell</h4>
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
          <p>{product.description}</p>
        </div>
      </div>
      <SectionProduct
        title={`Relative ${product.brand_name} Product`}
        data={relativeProductOfBrand}
      />
      <SectionProduct
        title={`Relative ${product.category_name} Product`}
        data={relativeProductOfCategory}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  const paths = [];
  for (const category of categories) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/fetch-products/${category.slug}`
    );
    const resJson = await res.json();
    const productSlugs = resJson.data.products;
    for (const productSlug of productSlugs) {
      paths.push({
        params: {
          slug: category.slug,
          productSlug: productSlug.slug,
        },
      });
    }
  }
  return { paths, fallback: false };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug;
  const productSlug = context.params?.productSlug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/product-details/${slug}/${productSlug}`
  );
  const resJson = await res.json();
  const product = resJson.data.product;
  const relativeProductOfCategory = resJson.data.relativeProductOfCategory;
  const relativeProductOfBrand = resJson.data.relativeProductOfBrand;
  return {
    props: {
      product: product[0].product,
      relativeProductOfCategory,
      relativeProductOfBrand,
    },
  };
}
