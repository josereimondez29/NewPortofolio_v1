"use client";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import Modal from "./Modal";
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    axios.get('/api/posts/') // Usar la ruta del proxy en lugar de la URL completa
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
        const chunks = chunkArray(response.data, 2); // Suponiendo que quieras 2 posts por slide
        setOutputArray(chunks);
        setShowSlider(true);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
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
                                    alt="blog"
                                    style={{ width: "100%", height: "fit-content" }}
                                  />
                                </a>
                                <div className="blog-meta">
                                  <span className="blog-date">{post.published_date}</span>
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





