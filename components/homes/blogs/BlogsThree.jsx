"use client";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Image from "next/image";

const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

export default function BlogsThree() {
  const [blogData, setBlogData] = useState([]);
  const [outputArray, setOutputArray] = useState([]);
  const [modalContent, setModalContent] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("https://cuddly-space-carnival-5wrwjwv7j793pg6-8000.app.github.dev/api/posts/");
      setBlogData(response.data);
      setOutputArray(chunkArray(response.data, 4));
      setShowSlider(true);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  return (
    <>
      <div className="bostami-page-content-wrap">
        <div className="section-wrapper pl-60 pr-60 pt-60">
          <div className="bostami-page-title-wrap mb-15">
            <h2 className="page-title">Blogs</h2>
          </div>
        </div>

        <div className="section-wrapper pr-60 pl-60 mb-60">
          <div className="blog-slider-wrap">
            <div className="swiper-container blog-slider-active">
              {showSlider && (
                <Swiper
                  modules={[Navigation, Pagination]}
                  pagination={{
                    el: ".blog-progation-three",
                    clickable: true,
                  }}
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={true}
                >
                  {outputArray.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <div className="swiper-slide">
                        <div className="row">
                          {elm.map((elm2, i2) => (
                            <div key={i2} className="col-lg-6 col-md-6">
                              <div className={`blog-slider-single ${elm2.bgClass}`}>
                                <a className="img cursor-pointer">
                                  <Image
                                    width={430}
                                    height={430}
                                    onClick={() => {
                                      setModalContent(elm2);
                                      setShowModal(true);
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "fit-content",
                                    }}
                                    src={`https://cuddly-space-carnival-5wrwjwv7j793pg6-8000.app.github.dev${elm2.image}`} // Construir la URL completa para la imagen
                                    alt={elm2.title} // Utiliza el título o alguna descripción relevante como alt
                                  />
                                </a>
                                <div className="blog-meta">
                                  <span className="blog-date">{new Date(elm2.created_at).toLocaleDateString()}</span>
                                  <span className="blog-category">{elm2.category}</span>
                                </div>
                                <h6
                                  className="blog-title"
                                  onClick={() => {
                                    setModalContent(elm2);
                                    setShowModal(true);
                                  }}
                                >
                                  <a className="cursor-pointer">{elm2.title}</a>
                                </h6>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <div className="blog-progation blog-progation-three"></div>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center bg-light-white-2 pt-25 pb-25">
          <span>
            © {new Date().getFullYear()} All Rights Reserved by ib-themes.
          </span>
        </div>
      </div>
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        modalContent={modalContent}
      />
    </>
  );
}


