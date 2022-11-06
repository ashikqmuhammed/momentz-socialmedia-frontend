import React from "react";
import { Link } from "react-router-dom";

export default function LikeCommentCount({
  singleView,
  likeCount,
  commentCount,
  post,
}) {
  return (
    <div className="like_comment_div">
      {likeCount !== 0 && <span className="">{`${likeCount} likes`}</span>}
      {commentCount !== 0 && (
        <span className="">{`${commentCount} comments`}</span>
      )}
      <img src="" alt="" />
    </div>
  );
}
// to={`/post/${post._id}`}
