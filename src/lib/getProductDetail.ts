interface PromiseProps {
  status: number;
  data: {
    product: [{ product: Product }, { colorOfProducts: [] }];
    relativeProductOfCategory: Product[];
    relativeProductOfBrand: Product[];
  };
}

export async function getProductDetail(
  category_slug: string,
  product_slug: string
): Promise<any[]> {
  const res = await fetch(
    `https://pacific-depths-48667.herokuapp.com/api/product-details/${category_slug}/${product_slug}`
  );
  // if (!res.ok) throw new Error('failed to fetch data')
  const resJson = await res.json();
  const product = resJson.data.product;
  const relativeProductOfCategory = resJson.data.relativeProductOfCategory;
  const relativeProductOfBrand = resJson.data.relativeProductOfBrand;
  return {
    product,
    relativeProductOfCategory,
    relativeProductOfBrand,
  };
}
