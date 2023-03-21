export async function getFeatured(): Promise<Product[]> {
  const res = await fetch(
    "https://pacific-depths-48667.herokuapp.com/api/featured"
  );
  if (!res.ok) throw new Error("failed to fetch data");
  const resJson = await res.json();
  return resJson.featuredProducts;
}
