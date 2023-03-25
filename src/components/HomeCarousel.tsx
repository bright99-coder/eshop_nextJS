import React, { useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Image from "next/image";

const HomeCarousel: React.FC<HomeCarousel> = ({ banners }) => {
  const mainImageRef = useRef<Slider>(null);

  useEffect(() => {
    if (mainImageRef.current) {
      mainImageRef.current.slickGoTo(0);
    }
  }, [banners]);

  const settings: Settings = {
    dots: false,
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
    <Slider
      ref={mainImageRef}
      {...settings}
      className="w-full max-h-[500px] overflow-hidden"
    >
      {banners.map(({ id, image, title }) => (
        <div key={id}>
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`}
            width={1000}
            height={500}
            className="w-full max-h-[500px] overflow-hidden"
            alt={title}
            priority
          />
        </div>
      ))}
    </Slider>
  );
};

export default HomeCarousel;
