'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {

  return (
    <div className={ className }>
      <Swiper
        style={{
          width: '100dvw',
          height: '500px',
        }}
        pagination
        autoplay={{
          delay: 2500
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
          images.map(image => (
            <SwiperSlide key={ image }>
              <Image
                key={ image }
                src={`/products/${ image }`}
                alt={ title }
                width={ 600 }
                height={ 500 }
                className="object-fill"
                priority
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
