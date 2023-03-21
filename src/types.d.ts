type Category = {
  category_name: string;
  slug: string;
  image: string;
  description: string;
};

type Brand = {
  brand_name: string;
  slug: string;
  category_name: string;
  image: string;
};

type Banner = {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
};

type Product = {
  id: number | string;
  category_name: string;
  product_name: string;
  slug: string;
  brand_name: string;
  description: string;
  original_price: number;
  selling_price: number;
  quantity: number;
  trending: string;
  featured: string;
  status: number;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  image: string;
  category: Category;
  brand: Brand;
};
