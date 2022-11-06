import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentDisplay from "../post/CommentDisplay";
import CommentForm from "../post/CommentForm";
import ImageBox from "../post/ImageBox";
import LikeCommentCount from "../post/LikeCommentCount";
import PostActions from "../post/PostActions";
import PostCaption from "../post/PostCaption";
import PostHeader from "../post/PostHeader";
import "./style.css";

export default function SingleViewPost() {
  const { user } = useSelector((state) => ({ ...state }));
  const [post, setPost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const { postId } = useParams();
  const commentBoxRef = useRef(null);
  const initialMyComments = post?.comments.filter(
    (obj) => obj.commentBy === user.id
  );
  const [myComments, setMyComments] = useState(null);
  const postFetch = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setPost(data);
      setLikeCount(post.likes.length);
      setCommentCount(post.comments.length);
      setMyComments(post.comments);
    } catch (error) {}
  };
  useEffect(() => {
    if (postId) {
      postFetch();
    }
  }, [postId]);
  return (
    <div className="blur">
      <div className="single_view">
        {post?.images.length && <ImageBox singleView post={post} />}
        <div className="single_right_wrap">
          {post && (
            <>
              <PostHeader singleView post={post} />
              {post.text && <PostCaption singleView post={post} />}
              <CommentDisplay
                singleView
                myComments={myComments}
                user={user}
                post={post}
              />
              <PostActions
                user={user}
                post={post}
                setLikeCount={setLikeCount}
                commentBoxRef={commentBoxRef}
                singleView
              />
              <LikeCommentCount
                likeCount={likeCount}
                commentCount={commentCount}
                post={post}
                singleView
              />

              <CommentForm
                user={user}
                post={post}
                setMyComments={setMyComments}
                setCommentCount={setCommentCount}
                singleView
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
