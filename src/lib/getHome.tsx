interface PromiseProps {
  status: number;
  data: {
    categories: Category;
    banners: Banner[];
    trendingProducts: Product[];
    featuredProducts: Product[];
  };
}

export async function getHome(): Promise<PromiseProps[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/home`
  );
  if (!res.ok) throw new Error("failed to fetch data");
  const resJson = await res.json();
  return resJson.data;
}
