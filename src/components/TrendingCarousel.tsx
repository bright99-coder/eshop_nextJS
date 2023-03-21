import React, { useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import CardProduct from "./CardProduct";
import ButtonLeft from "./ButtonLeft";
import ButtonRight from "./ButtonRight";
import { SlEnergy } from "react-icons/sl";

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const TrendingCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
}) => {
  const mainImageRef = useRef<Slider>(null);

  useEffect(() => {
    if (mainImageRef.current) {
      mainImageRef.current.slickGoTo(0);
    }
  }, [products]);

  const settings: Settings = {
    arrows: true,
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    nextArrow: <ButtonLeft />,
    prevArrow: <ButtonRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-0 md:px-5 lg:px-20 mt-4 md:mt-8 lg:mt-10">
      <div className="flex items-center text-2xl font-bold mb-2">
        <SlEnergy className="mx-2" />
        {title}
      </div>
      <div className="w-full px-5">
        <Slider ref={mainImageRef} {...settings}>
          {products?.map((item) => (
            <CardProduct key={item.id} data={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendingCarousel;
