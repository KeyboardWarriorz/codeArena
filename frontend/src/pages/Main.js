// import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

import styled from "styled-components";

import iu1 from "../assets/images/아이유1.jpg";
import iu2 from "../assets/images/아이유2.jpg";
import iu3 from "../assets/images/아이유3.jpg";

const ImgBanner = styled.img`
  width: 50%;
  height: 50%;
  max-height: initial;
  overflow: hidden;
`;

const StyledSwiper = styled(Swiper)`
  .swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: white;
    -webkit-touch-callout: none;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  .swiper-pagination-bullet:hover {
    background: #b1b2ff;
  }

  .swiper-pagination-bullet-active {
    color: #fff;
    background: #7f5feb;
    width: 50px;
    height: 20px;
    border-radius: 10px;
  }
`;

const MainContainer = styled.div`
  border: 2px red solid;
  padding: 2rem 4rem 16rem;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 2px blue solid;
`;

const H2Title = styled.h2`
  text-align: left;
  padding-left: 20px;
  font-weight: bold;
`;

// 내부에 반복문 돌릴 예정
const ListBox = styled.div`
  border: 2px pink solid;
  display: flex;
  flex-flow: row wrap;
  column-gap: 4.3rem;
  row-gap: 3.5 rem;
`;

const LectureBox = styled.div`
  border: 2px green solid;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.5rem;
  height: 9.5 rem;
  background-color: #f6f6f8;
  transition: 0.2s linear;

  &:hover {
    background: #5cdbc7;
    color: red;
    transition: 0.5s;
    cursor: pointer;
  }
`;

export default function Main() {
  const navigate = useNavigate();

  const imagelist = [iu1, iu2, iu3];

  const imageCarousel = imagelist.map((image, idx) => {
    return (
      <SwiperSlide key={idx}>
        <ImgBanner
          className="img-back"
          src={image}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
      </SwiperSlide>
    );
  });
  return (
    <>
      <StyledSwiper
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
      </StyledSwiper>
      <MainContainer>
        <SubContainer>
          <H2Title>&gt; Join Arena!</H2Title>
          <ListBox>
            <LectureBox>asdasd</LectureBox>
            <LectureBox>asdasd</LectureBox>
            <LectureBox>asdasd</LectureBox>
            <LectureBox>asdasd</LectureBox>
            <LectureBox>asdasd</LectureBox>
            <LectureBox>asdasd</LectureBox>
          </ListBox>
        </SubContainer>
      </MainContainer>
    </>
  );
}
