import "./style.css";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";
import Moment from "react-moment";
import { Dots } from "../../svg";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { likePostFn } from "../../functions/post";
import axios from "axios";
import ImageBox from "./ImageBox";
import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
import LikeCommentCount from "./LikeCommentCount";
import PostActions from "./PostActions";

export default function Post({ post }) {
  const { user } = useSelector((state) => ({ ...state }));

  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentCount, setCommentCount] = useState(post.comments.length);
  const initialMyComments = post.comments.filter(
    (obj) => obj.commentBy === user.id
  );
  const [myComments, setMyComments] = useState(initialMyComments);

  const commentBoxRef = useRef(null);

  return (
    <div className="post">
      <div className="post_wrapper">
        <PostHeader post={post} />
        {post.background ? (
          <div
            className="post_bg"
            style={{ backgroundImage: `url(${post.background})` }}
          >
            <div className="post_bg_text">{post.text}</div>
          </div>
        ) : (
          <>{post?.images && post?.images.length && <ImageBox post={post} />}</>
        )}

        {/* {post.text && <div className="post_text">{post.text}</div>} */}
        <PostActions
          post={post}
          user={user}
          setLikeCount={setLikeCount}
          commentBoxRef={commentBoxRef}
        />
        <LikeCommentCount
          post={post}
          likeCount={likeCount}
          commentCount={commentCount}
        />
        <PostCaption post={post} />
        <CommentForm
          ref={commentBoxRef}
          setMyComments={setMyComments}
          user={user}
          post={post}
          setCommentCount={setCommentCount}
        />
        {commentCount !== 0 && myComments.length !== 0 && (
          <CommentDisplay post={post} myComments={myComments} user={user} />
        )}
      </div>
    </div>
  );
}
