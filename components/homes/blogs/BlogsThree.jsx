"use client";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
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
  const [posts, setPosts] = useState([]);
  const [outputArray, setOutputArray] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    axios.get("https://josereimondez.com/api/posts/")
      .then(response => {
        // Verifica la estructura de los datos aquí
        console.log(response.data);  
        setPosts(response.data);
        setOutputArray(chunkArray(response.data, 4));
        setShowSlider(true);
      })
      .catch(error => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

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
                  {outputArray.map((chunk, chunkIndex) => (
                    <SwiperSlide key={chunkIndex}>
                      <div className="swiper-slide">
                        <div className="row">
                          {chunk.map(post => (
                            <div key={post.id} className="col-lg-6 col-md-6">
                              <div className="blog-slider-single bg-prink">
                                <a className="img cursor-pointer" onClick={() => { setModalContent(post); setShowModal(true); }}>
                                  <Image
                                    width={430}
                                    height={430}
                                    src={post.image}
                                    alt={post.title}  // Usa el título o una descripción para alt
                                    style={{ width: "100%", height: "auto" }} // Cambia 'fit-content' por 'auto'
                                  />
                                </a>
                                <div className="blog-meta">
                                  <span className="blog-date">{new Date(post.created_at).toLocaleDateString()}</span>  {/* Formatea la fecha */}
                                  <span className="blog-category">{post.category}</span>
                                </div>
                                <h6 className="blog-title">
                                  <a className="cursor-pointer" onClick={() => { setModalContent(post); setShowModal(true); }}>{post.title}</a>
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
      {modalContent && (
        <Modal setShowModal={setShowModal} showModal={showModal} modalContent={modalContent} />
      )}
    </>
  );
}




