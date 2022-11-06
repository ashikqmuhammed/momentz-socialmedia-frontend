import React, { useState } from "react";

export default function ImageBox({singleView, post }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const shiftRight = () => {
    if (post.images.length - 1 === currentImageIndex) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };
  const shiftLeft = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(post.images.length - 1);
    } else {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };
  return (
   (
      <div className={`grid_1 ${singleView?"single_view_img":""}`}>
        <img
          src={post.images[currentImageIndex].url}
          alt=""
          className={`img-0`}
        />
        {post.images.length > 1 && (
          <svg
            onClick={shiftRight}
            className="post_slider_icon post_slider_right "
            viewBox="0 0 384 512"
          >
            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        )}
        {post.images.length > 1 && (
          <svg
            onClick={shiftLeft}
            className="post_slider_icon post_slider_left "
            viewBox="0 0 384 512"
          >
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        )}
      </div>
    )
  );
}
