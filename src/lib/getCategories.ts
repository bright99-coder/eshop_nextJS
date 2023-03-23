export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/all-categories`);
  if (!res.ok) throw new Error('failed to fetch data')
  const resJson = await res.json();
  return resJson.categories;
}
