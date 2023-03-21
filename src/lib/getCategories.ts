export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    "https://pacific-depths-48667.herokuapp.com/api/all-categories"
  );
  if (!res.ok) throw new Error('failed to fetch data')
  const resJson = await res.json();
  return resJson.categories;
}
