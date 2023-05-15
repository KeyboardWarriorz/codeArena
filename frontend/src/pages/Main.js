import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

import styled from "styled-components";

import iu1 from "../assets/images/아이유1.jpg";
import iu2 from "../assets/images/아이유2.jpg";
import iu3 from "../assets/images/아이유3.jpg";

const imagelist = [iu1, iu2, iu3];

const imageCarousel = imagelist.map((image, idx) => {
  return (
    <SwiperSlide key={idx}>
      <img
        className="img-back"
        src={image}
        alt=""
        // onClick={() => {
        //   navigate("/");
        // }}
      />
    </SwiperSlide>
  );
});

export default function Main() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {imageCarousel}
    </Swiper>
  );
}
