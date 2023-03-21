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
    "https://pacific-depths-48667.herokuapp.com/api/home"
  );
  if (!res.ok) throw new Error("failed to fetch data");
  const resJson = await res.json();
  return resJson.data;
}
