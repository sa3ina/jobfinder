import React, { useRef, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import type { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchComment } from "../../redux/slices/CommentSlice";
import { Pagination, Navigation } from "swiper/modules";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import { postComment } from "../../redux/slices/CommentSlice";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import SwiperCore from "swiper";
SwiperCore.use([Navigation]);
type Props = {};

const Comment = (props: Props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState(2);

  const [open, setOpen] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);
  let arr = [1, 2, 3, 4, 5];
  const containerWidth = 700;
  const minSpaceBetween = 30;

  const slidesPerView = Math.floor(containerWidth / 300);

  const spaceBetween = Math.floor(
    (containerWidth - slidesPerView * 300) / (slidesPerView - 1)
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userInfo = JSON.parse(localStorage.getItem("login") || "{}");
  useEffect(() => {
    dispatch(fetchComment());
  }, [dispatch]);
  const { comments, loading, error } = useSelector(
    (state: RootState) => state.comments
  );
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    const newSlides = comments.map((elem) => (
      <SwiperSlide key={elem.id} className="my-swiper-slide">
        <div className="swipercont">
          <div className="stars">
            {arr.map((_, i) => (
              <img
                key={i}
                src={
                  i < elem.rating
                    ? "https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3e06ce2d5f111ed03ea1e_star-fill.svg"
                    : "https://images.emojiterra.com/mozilla/1024px/2b50.png"
                }
                alt=""
                className="star"
              />
            ))}
          </div>
          <p className="moon">{elem.comment}</p>
          <div className="information">
            <img
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3e06ce2d5f128a903ea1f_07.jpg"
              alt=""
              className="profile"
            />
            <div className="info">
              <p className="name">{elem.fullname}</p>
              <p className="work">Our customer</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ));
    setSlides(newSlides);
  }, [comments]);
  return (
    <>
      <div className="comment">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              p: 4,
              fontFamily: "Outfit",
              borderRadius: "4px",
            }}
          >
            <Formik
              initialValues={{
                id: uuidv4(),
                fullname: userInfo.firstname + " " + userInfo.lastname,
                rating: value,
                comment: "",
              }}
              onSubmit={(values) => {
                console.log(values);
                dispatch(postComment(values));
                handleClose();
                enqueueSnackbar("Comment added successfully!", {
                  variant: "success",
                });
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className="form">
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                        setFieldValue("rating", newValue);
                      }}
                    />
                    <Field
                      name="comment"
                      className="field"
                      as="textarea"
                      placeholder="Type your comment.."
                    />
                  </div>
                  <button type="submit" className="submit">
                    Add comment
                  </button>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
        <Grid container className="commentgrid" spacing={10}>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <p className="trusted">
              Trusted by over 20,000+ users around the world
            </p>
            <p className="moonlight">
              He moonlights difficult engrossed it, sportsmen. Interested has
              all Devonshire difficulty guy assistance joy.
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
            {/* <Swiper
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
              {arr.map((elem, i) => {
                return (
                  <SwiperSlide className="my-swiper-slide">
                    <div className="swipercont">
                      <div className="stars">
                        {arr.map((elem, i) => {
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
            </Swiper> */}
            <Swiper
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
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
              spaceBetween={
                spaceBetween < minSpaceBetween ? minSpaceBetween : spaceBetween
              }
              // loop={true}
            >
              {slides}
            </Swiper>
            <img
              className="custom-prev "
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3ef961c777477955a1055_arrow-left.svg"
            />
            <img
              className="custom-next"
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3efa0a6da8ae26fe8c0e0_arrow-right.svg"
            />
            {localStorage.getItem("login") ? (
              <button className="commentbutton" onClick={handleOpen}>
                add yours
              </button>
            ) : (
              ""
            )}
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
