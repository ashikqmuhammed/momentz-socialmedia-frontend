import React from "react";
import { Link } from "react-router-dom";

export default function PostCaption({ post, singleView }) {
  return (
    <>
      {post.text && post.text.length < 106 && (
        <div className="post_caption">
          <div>{post.text}</div>
        </div>
      )}
      {post.text && post.text.length >= 106 && (
        <div className={singleView ? "post_caption_extra" : "post_caption"}>
          <div>
            {post.text.slice(0, 105)}
            <span>...</span>
            <Link to={`/post/${post._id}`} className="more_option">
              more
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
