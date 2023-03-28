import SectionProduct, {
  SectionProductSkeleton,
} from "@/components/SectionProduct";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

export default function SearchPage() {
  const { query, push } = useRouter();
  const { productName } = query;
  const [searchProducts, setSearchProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    document.title = "Search";
    axios
      .get(`/api/search-product`, {
        params: {
          keyword: productName,
        },
      })
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setSearchProducts(res.data.searchProducts);
          } else if (res.data.status === 404) {
            swal("Error", res.data.message, "error");
            push("/");
          }
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);
  if (loading) {
    return <SectionProductSkeleton title="Search Product" />;
  }
  return <SectionProduct title="Search Product" data={searchProducts} />;
}
