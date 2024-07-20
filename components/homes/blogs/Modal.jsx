// Modal.jsx
"use client";
import React, { useEffect } from "react";
import Image from "next/image";

export default function Modal({ setShowModal, showModal, modalContent }) {
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const modalDialog = document.querySelector(".modal");
      const modalContent = document.querySelector(".modal-content");

      if (
        modalDialog &&
        modalContent &&
        !modalContent.contains(event.target) &&
        modalDialog.contains(event.target)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [setShowModal]);

  return (
    <>
      <div
        className={`modal h1-modal-box fade ${showModal ? "show" : ""} `}
        id="h1-blog-1"
        tabIndex="-1"
        role="dialog"
        style={{
          transition: "0.4s",
          display: "block",
          visibility: `${showModal ? "visible" : "hidden"}`,
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="h1-modal-img">
                {modalContent?.image && (
                  <Image
                    width={800}
                    height={800}
                    src={modalContent?.image}
                    style={{
                      width: "100%",
                      height: "fit-content",
                      maxHeight: "450px",
                      objectFit: "cover",
                    }}
                    alt="blog"
                  />
                )}
              </div>

              <div className="blog-meta">
                <span className="blog-date">{modalContent?.created_at}</span>
                <span className="blog-category">{modalContent?.category}</span>
              </div>

              <h6 className="blog-title">{modalContent?.title}</h6>

              <div className="h1-modal-paragraph">
                {modalContent?.content && modalContent.content.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="h1-modal-comment-item">
                <div className="img">
                  <Image
                    width={125}
                    height={152}
                    src="/assets/img/parsonal-info/parson-img-2.png"
                    alt="comment"
                  />
                </div>
                <div className="content">
                  <div className="name-date">
                    <h5 className="name">Rafia Ana</h5>
                    <span className="date">15 min ago</span>
                  </div>
                  <p className="comment-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi nam ad, unde vel aut soluta atque consequatur. Omnis,
                    debitis nihil?
                  </p>
                  <a className="reply-btn" href="#">
                    Reply
                  </a>
                </div>
              </div>

              <div className="h1-modal-comment-box">
                <h2 className="title">Leave a Reply</h2>
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="write comment"
                ></textarea>
                <button>comment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
