import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

// import "swiper/css";
// import "swiper/swiper.min.css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";

import { Autoplay, Pagination, Navigation } from "swiper";

import styled from "styled-components";

import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import banner4 from "../assets/images/banner4.png";

import an1 from "../assets/images/Jieun.svg";
import an2 from "../assets/images/Seongwhan.svg";
import an3 from "../assets/images/Eunhyo.svg";
import an4 from "../assets/images/Junseo.svg";
import an5 from "../assets/images/Sunyeong.svg";

import bear from "../assets/images/bear.png";
import rabbit from "../assets/images/rabbit.png";
import brocolli from "../assets/images/brocolli.png";
import alpaca from "../assets/images/alpaca.png";

const ImgBanner = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: initial;
  overflow: hidden;
`;

const StyledSwiper = styled(Swiper)`
  .swiper-pagination-bullet {
    // width: 20px;
    // height: 20px;
    // text-align: center;
    // line-height: 20px;
    // font-size: 12px;
    // color: red;
    // opacity: 1;
    background: white;
    // -webkit-touch-callout: none;
    // user-select: none;
    // -moz-user-select: none;
    // -ms-user-select: none;
    // -webkit-user-select: none;
  }

  // .swiper-pagination-bullet:hover {
  //   background: #b1b2ff;
  // }

  .swiper-pagination-bullet-active {
    color: #fab809;
    background: #fab809;

    border-radius: 10px;
  }

  .swiper-button-prev {
    // background-color: #fab809;
    color: #fab809;
  }

  .swiper-button-next {
    // background-color: #fab809;
    color: #fab809;
  }
`;

const MainContainer = styled.div`
  // border: 2px red solid;
  padding: 2rem 6rem 16rem;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;
  // border: 2px blue solid;
`;

const H2Title = styled.h2`
  text-align: left;
  padding-left: 20px;
  font-weight: bold;
`;

// 내부에 반복문 돌릴 예정
const ListBox = styled.div`
  // border: 2px pink solid;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  // column-gap: 4.3rem;
  // row-gap: 3 rem;
`;

const Box = styled.a`
  display: flex;
  flex-direction: column;
  align-items: Center;
  align-center: center;
  cursor: pointer;

  p {
    color: #858585;
  }
`;

const LectureBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.5rem;
  height: 9.5rem;
  background-color: #f6f6f8;
  transition: 0.2s linear;
  border-radius: 10px;

  &:hover {
    background: #f9f5d7;
    color: red;
    transition: 0.5s;
  }
`;

const BoxTitle = styled.h3`
  margin: 0;
`;

const SmallImg = styled.img`
  width: 80px;
  height: 80px;
`;

export default function Main() {
  const navigate = useNavigate();

  const imagelist = [banner1, banner2, banner3, banner4];

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
          <H2Title></H2Title>
          <ListBox>
            <Box onClick={() => navigate("/lecture")}>
              <LectureBox>
                <SmallImg src={bear} />
              </LectureBox>
              <p>기초 지식부터 시작하고 싶을 때</p>
              <BoxTitle>📚 기초 개념</BoxTitle>
            </Box>
            <Box onClick={() => navigate("/problem")}>
              <LectureBox>
                <SmallImg src={alpaca} />
              </LectureBox>
              <p>문제풀이로 실력을 다지고 싶을 때</p>
              <BoxTitle>📝 문제 풀이</BoxTitle>
            </Box>
            <Box onClick={() => navigate("/board")}>
              <LectureBox>
                <SmallImg src={rabbit} />
              </LectureBox>
              <p>자유롭게 얘기하고 질문도 해보자</p>
              <BoxTitle>😍 커뮤니티</BoxTitle>
            </Box>
            {/* <Box onClick={() => navigate("/multiquiz")}>
              <LectureBox>
                <SmallImg src={brocolli} />
              </LectureBox>
              <p>다른 사람들도 이겨봐용</p>
              <BoxTitle>🎮 단체 퀴즈</BoxTitle>
            </Box> */}
          </ListBox>
        </SubContainer>
      </MainContainer>
    </>
  );
}
