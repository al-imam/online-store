"use client";

import { AddCart } from "$components/utility";
import ProductInterface from "$types/productInterface";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface ProductProps {
  item: ProductInterface;
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Product({ item }: ProductProps) {
  return (
    <li className="relative block overflow-hidden">
      <Link href={`/product/${item._id}`} draggable={false}>
        <div className="relative hover:overlay-effect ">
          <Swiper
            loop
            pagination={false}
            scrollbar={false}
            modules={[Autoplay]}
            autoplay={{
              delay: getRandomNumber(2000, 5000),
              pauseOnMouseEnter: true,
            }}
          >
            {item.images.map((image) => (
              <SwiperSlide>
                <img
                  src={image.url}
                  alt={item.name}
                  className="h-64 w-full object-contain "
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Link>

      <div className="relative border border-gray-100 bg-white p-6">
        <Link
          href={`/product/${item._id}`}
          className="mt-4 text-base font-medium text-gray-900 line-clamp-1 hover:text-blue-600"
        >
          {item.name}
        </Link>

        <div className="flex items-center justify-between mt-1.5">
          <p className="text-sm text-gray-700">${item.price}</p>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
            New
          </span>
        </div>

        <div className="mt-4 z-50">
          <AddCart product={item} />
        </div>
      </div>
    </li>
  );
}
