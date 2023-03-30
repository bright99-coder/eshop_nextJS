interface Button {
  variant: "contained" | "outlined" | "startIcon";
  children: ReactNode;
  className?: string;
  icons?: any;
  href?: string;
  [key: string]: any;
}

interface IconButton {
  children: ReactNode;
  className?: string;
  href?: string;
  tooltip?: string;
  [key: string]: any;
}

interface Grid {
  variant: "primary" | "second" | "third";
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

interface TextField {
  variant: "small" | "large";
  label: string;
  helperText?: string;
  className?: string;
  type: string;
  [key: string]: any;
}

interface TextArea {
  variant: "small" | "large";
  label: string;
  className?: string;
  helperText?:any;
  [key: string]: any;
}

interface NavbarItem {
  title: string;
  href: string;
}
interface SectionProduct {
  title?: string;
  data: Product[];
  className?: string;
  compareIcon?: any;
}
interface SectionProductSkeleton {
  title?: string;
  className?: string;
}
interface TrendingCarousel {
  title: string;
  products: Product[];
}
interface HomeCarousel {
  banners: Banner[];
}

interface FooterItem {
  title: string;
  href: string;
  className?: string;
}

interface HeaderLabel {
  title: string;
  contentButton: string;
  href: string;
}
