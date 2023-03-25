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

type ProductItemCart = {
  id: number | string;
  brand: Brand;
  category: Category;
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

type CartItem = {
  id: number;
  product: ProductItemCart;
  product_color_name: string | null;
  product_id: string;
  product_quantity: number;
  user_id: string;
  created_at: any;
  updated_at: any;
};

type OrderItem = {
  id: number;
  user_id: number;
  tracking_no: string;
  email: string;
  fullname: string;
  phone: string;
  pincode: string;
  address: string;
  payment_id: string | null;
  payment_mode: string;
  status_message: string;
  created_at: any;
  updated_at: any;
};

type OrderItemDetail = {
  product: Product;
  id: number;
  order_id: number;
  price: number;
  product_color_name: string | null;
  product_id: number;
  quantity: number;
  updated_at: any;
};

