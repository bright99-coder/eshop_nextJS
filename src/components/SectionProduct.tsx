import React from "react";
import CardProduct from "./CardProduct";
import { SlEnergy } from "react-icons/sl";

interface ProductProps {
  title?: string;
  data: any[];
  className?: string;
}

const SectionProduct: React.FC<ProductProps> = ({ title, data, className }) => {
  return (
    <div className={`px-5 md:px-10 lg:px-20 py-5 lg:py-10 ${className}`}>
      {title && (
        <div className="flex items-center text-2xl font-bold mb-2">
          <SlEnergy className="mr-2" />
          {title}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {data.map((item, index) => (
          <div key={index}>
            <CardProduct data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionProduct;
