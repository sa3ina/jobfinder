import React, { useRef, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";

import { Pagination, Navigation } from "swiper/modules";
type Props = {};

const Comment = (props: Props) => {
  const [swiperRef, setSwiperRef] = useState(null);
  let arr = [1, 2, 3, 4, 5];
  const containerWidth = 700;
  const minSpaceBetween = 30;

  const slidesPerView = Math.floor(containerWidth / 300);

  const spaceBetween = Math.floor(
    (containerWidth - slidesPerView * 300) / (slidesPerView - 1)
  );

  return (
    <>
      <div className="comment">
        <Grid container className="commentgrid" spacing={10}>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <p className="trusted">
              Trusted by over 20,000+ users around the world
            </p>
            <p className="moonlight">
              He moonlights difficult engrossed it, sportsmen. Interested has
              all Devonshire difficulty gay assistance joy.
            </p>
            <div className="counts">
              <div className="item">
                <div className="cont">
                  <p className="count">1500</p>
                  <p className="plus">+</p>
                </div>
                <p className="countname">Job offer</p>
              </div>
              <div className="item">
                <div className="cont">
                  <p className="count">100</p>
                  <p className="plus">+</p>
                </div>
                <p className="countname">Country</p>
              </div>
              <div className="item">
                <div className="cont">
                  <p className="count">300</p>
                  <p className="plus">+</p>
                </div>
                <p className="countname">Total companies</p>
              </div>
            </div>
          </Grid>
          <Grid item lg={7} md={12} sm={12} xs={12}>
            <Swiper
              onSwiper={setSwiperRef}
              spaceBetween={
                spaceBetween < minSpaceBetween ? minSpaceBetween : spaceBetween
              }
              slidesPerView={slidesPerView}
              loop={true}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              pagination={{
                type: "fraction",
              }}
              modules={[Navigation]}
              className="mySwiper"
              style={{ maxWidth: "100%" }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
              }}
            >
              {arr.map((elem) => {
                return (
                  <SwiperSlide className="my-swiper-slide">
                    <div className="swipercont">
                      <div className="stars">
                        {arr.map((elem) => {
                          return (
                            <img
                              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3e06ce2d5f111ed03ea1e_star-fill.svg"
                              alt=""
                              className="star"
                            />
                          );
                        })}
                      </div>
                      <p className="moon">
                        “Moonlight newspaper up its enjoyment agreeable
                        depending. Timed voice share led him to widen noisy
                        young at weddings.”
                      </p>
                      <div className="information">
                        <img
                          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3e06ce2d5f128a903ea1f_07.jpg"
                          alt=""
                          className="profile"
                        />
                        <div className="info">
                          <p className="name">Carolyn Ortiz</p>
                          <p className="work">Designer at Apple</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <img
              className="custom-prev "
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3ef961c777477955a1055_arrow-left.svg"
            />
            <img
              className="custom-next"
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3efa0a6da8ae26fe8c0e0_arrow-right.svg"
            />
          </Grid>
        </Grid>
        <img
          className="head head1"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f1e12ac12c4b04ce9943_avatar-09.svg"
          alt=""
        />
        <img
          className="head head2"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f283e0edaf07a30178b2_avatar-10.svg"
          alt=""
        />
        <img
          className="head head3"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f28c70734309f0436b3e_avatar-11.svg"
          alt=""
        />
        <img
          className="head head4"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f2931f032e7deb4ef2fb_avatar-12.svg"
          alt=""
        />
        <img
          className="head head5"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f29c2ac12cdd81cea767_avatar-13.svg"
          alt=""
        />
        <img
          className="head head6"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f62843a0731db25181ae_avatar-14.svg"
          alt=""
        />
        <img
          className="head head7"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f1e12ac12c4b04ce9943_avatar-09.svg"
          alt=""
        />
        <img
          className="head head8"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f283e0edaf07a30178b2_avatar-10.svg"
          alt=""
        />
        <img
          className="head head9"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f28c70734309f0436b3e_avatar-11.svg"
          alt=""
        />
        <img
          className="head head10"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3f2931f032e7deb4ef2fb_avatar-12.svg"
          alt=""
        />
      </div>
    </>
  );
};

export default Comment;
