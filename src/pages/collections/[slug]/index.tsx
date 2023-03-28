import { GetStaticPaths, GetStaticPropsContext } from "next";
import Link from "next/link";
import React from "react";
import { getCategories } from "@/lib/getCategories";
import { getProductCategory } from "@/lib/getProductCategory";
import SectionProduct from "@/components/SectionProduct";
import CompareModal from "@/components/CompareModal";
interface Props {
  products: Product[];
}

export default function index({ products }: Props) {
  if (!products) return null;
  return (
    <div>
      <div className="min-h-[48px] bg-primary px-5 md:px-10 lg:px-20 flex items-center">
        <Link className="text-blue-500 underline" href="/collections">
          Collections
        </Link>{" "}
        /
        <Link className="text-blue-500 underline" href="/collections">
          {products[0].category_name}
        </Link>{" "}
      </div>
      <SectionProduct data={products} />
      <CompareModal />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  return {
    paths: categories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: false,
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug;
  if (!slug) return { notFound: true };
  const products = await getProductCategory({ slug });
  return {
    props: {
      products,
    },
  };
}
