// myblog/src/components/homes/blogs/Modal.jsx

"use client";
import Image from "next/image";
import React, { useEffect } from "react";

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
                <span className="blog-cetagory">{modalContent?.category}</span>
              </div>

              <h6 className="blog-title">{modalContent?.title}</h6>

              <div className="h1-modal-paragraph">
                {modalContent?.content && modalContent?.content.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
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
      {showModal && (
        <div className="modal-header ">
          <button
            type="button"
            className="close"
            data-bs-dismiss="modal"
            onClick={() => setShowModal(false)}
          >
            <i className="far fa-times"></i>
          </button>
        </div>
      )}
    </>
  );
}
