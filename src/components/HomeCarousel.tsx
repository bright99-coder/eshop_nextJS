import React, { useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import ButtonLeft from "./ButtonLeft";
import ButtonRight from "./ButtonRight";

interface Image {
  id: number | string;
  src: string;
}

interface ProductCarouselProps {
  images: Image[];
}

const HomeCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  const mainImageRef = useRef<Slider>(null);

  useEffect(() => {
    if (mainImageRef.current) {
      mainImageRef.current.slickGoTo(0);
    }
  }, [images]);

  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full max-h-[500px] overflow-hidden">
      <Slider ref={mainImageRef} {...settings}>
        {images.map(({ id, src }, index) => (
          <div key={index}>
            <Image
              src={src}
              width={1000}
              height={500}
              className="object-contain w-full"
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCarousel;
