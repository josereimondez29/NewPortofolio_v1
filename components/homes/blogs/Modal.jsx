"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faRss } from "@fortawesome/free-solid-svg-icons";

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
        className={`modal h1-modal-box fade ${showModal ? "show" : ""}`}
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
                    src={`https://cuddly-space-carnival-5wrwjwv7j793pg6-8000.app.github.dev${modalContent.image}`}
                    width={800}
                    height={450}
                    layout="responsive"
                    style={{
                      objectFit: "cover",
                    }}
                    alt={modalContent.title || "Blog post image"}
                  />
                )}
              </div>

              <div className="blog-meta">
                <span className="blog-date">{new Date(modalContent?.created_at).toLocaleDateString()}</span>
                <span className="blog-category">{modalContent?.category}</span>
              </div>

              <h6 className="blog-title">{modalContent?.title}</h6>

              <div className="h1-modal-paragraph">
                {modalContent?.content ? (
                  <p>{modalContent.content}</p>
                ) : (
                  <p>No description available.</p>
                )}
              </div>

              <div className="h1-modal-share-buttons">
                <span>Compartir:</span>
                <button
                  className="btn btn-linkedin"
                  onClick={() => shareOnLinkedIn(modalContent)}
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </button>
                <button
                  className="btn btn-whatsapp"
                  onClick={() => shareOnWhatsApp(modalContent)}
                >
                  <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                </button>
                <button
                  className="btn btn-email"
                  onClick={() => shareByEmail(modalContent)}
                >
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </button>
                <button
                  className="btn btn-rss"
                  onClick={() => shareRSS()}
                >
                  <FontAwesomeIcon icon={faRss} size="lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-header">
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

// Helper functions for sharing
const shareOnLinkedIn = (post) => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
  window.open(url, '_blank');
};

const shareByEmail = (post) => {
  const subject = `Check out this blog post: ${post.title}`;
  const body = `${post.content}\n\nRead more: ${window.location.href}`;
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const shareOnWhatsApp = (post) => {
  const url = `https://wa.me/?text=${encodeURIComponent(post.content + '\n\nRead more: ' + window.location.href)}`;
  window.open(url, '_blank');
};

const shareRSS = () => {
  const rssFeedUrl = 'http://example.com/rss-feed.xml'; // Replace with your actual RSS feed URL
  window.open(rssFeedUrl, '_blank');
};

