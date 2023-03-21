export async function getTrending(): Promise<Product[]> {
  const res = await fetch(
    "https://pacific-depths-48667.herokuapp.com/api/trending"
  );
  if (!res.ok) throw new Error("failed to fetch data");
  const resJson = await res.json();
  return resJson.trendingProducts;
}
