// myblog/src/components/homes/blogs/BlogsThree.jsx

"use client";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import axios from "axios";

// Función para dividir el array en chunks
const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

export default function BlogsThree() {
  const [outputArray, setOutputArray] = useState([]);
  const [modalContent, setModalContent] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/posts/");
        const posts = response.data;
        setOutputArray(chunkArray(posts, 4));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
    setShowSlider(true);
  }, []);

  return (
    <>
      <div className="bostami-page-content-wrap">
        <div className="section-wrapper pl-60 pr-60 pt-60">
          <div className="bostami-page-title-wrap mb-15">
            <h2 className="page-title">blogs</h2>
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
                  {outputArray.map((chunk, i) => (
                    <SwiperSlide key={i}>
                      <div className="swiper-slide">
                        <div className="row">
                          {chunk.map((post, j) => (
                            <div key={j} className="col-lg-6 col-md-6">
                              <div className={`blog-slider-single bg-prink`}>
                                <a className="img cursor-pointer">
                                  <Image
                                    width={430}
                                    height={430}
                                    onClick={() => {
                                      setModalContent(post);
                                      setShowModal(true);
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "fit-content",
                                    }}
                                    src={post.image} // Suponiendo que "image" es el campo en tu modelo Post
                                    alt="blog"
                                  />
                                </a>
                                <div className="blog-meta">
                                  <span className="blog-date">{post.created_at}</span>
                                  <span className="blog-cetagory">{post.category}</span>
                                </div>
                                <h6
                                  className="blog-title"
                                  onClick={() => {
                                    setModalContent(post);
                                    setShowModal(true);
                                  }}
                                >
                                  <a className="cursor-pointer">{post.title}</a>
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
            © {new Date().getFullYear()} Todos los Derechos Reservados - Web Diseñada por José Reimondez
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
