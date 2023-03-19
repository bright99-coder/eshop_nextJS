import React, { useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import CardProduct from "./CardProduct";
import ButtonLeft from "./ButtonLeft";
import ButtonRight from "./ButtonRight";

interface Image {
  id: number | string;
  src: string;
}

interface ProductCarouselProps {
  images: Image[];
}

const TrendingCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  const mainImageRef = useRef<Slider>(null);

  useEffect(() => {
    if (mainImageRef.current) {
      mainImageRef.current.slickGoTo(0);
    }
  }, [images]);

  const settings: Settings = {
    arrows: true,
    infinite: true,
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
    <div className="w-full px-5 lg:px-20 my-4 md:my-8 lg:my-10">
      <Slider ref={mainImageRef} {...settings}>
        {images?.map((item, index) => (
          <CardProduct key={item.id} data={item} />
        ))}
      </Slider>
    </div>
  );
};

export default TrendingCarousel;
