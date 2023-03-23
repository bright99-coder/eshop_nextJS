export async function getFeatured(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/featured`
  );
  if (!res.ok) throw new Error("failed to fetch data");
  const resJson = await res.json();
  return resJson.featuredProducts;
}
