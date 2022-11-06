import React from "react";
import { Link } from "react-router-dom";

export default function CommentDisplay({ myComments, user, post, singleView }) {
  return (
    <Link
      to={`/post/${post._id}`}
      className={singleView ? "comment_display_extra" : "comment_display"}
    >
      <div
        className={
          singleView
            ? "comment_display_wrapper_extra"
            : "comment_display_wrapper scrollbar"
        }
      >
        <div className="comment_display_header">Comments</div>
        <div className="all_comment_wrap">
          {myComments?.map((commentObj) => (
            <div key={commentObj._id} className="my_comment_wrapper">
              <pre className="comment_username">{`${user?.first_name} ${user?.last_name}`}</pre>
              {commentObj.comment.length > 50 && (
                <pre className="comment_text">
                  {` ${commentObj.comment.slice(0, 42)}`}
                  <span>...</span>
                  <span className="more_option">more</span>
                </pre>
              )}
              {commentObj.comment.length < 50 && (
                <pre className="comment_text">{` ${commentObj.comment}`}</pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
