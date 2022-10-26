import "./style.css";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";
import Moment from "react-moment";
import { Dots } from "../../svg";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { likePostFn } from "../../functions/post";
import axios from "axios";

export default function Post({ post }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [like, setLike] = useState(post.likes.includes(user.id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentCount, setCommentCount] = useState(post.comments.length);
  const initialMyComments = post.comments.filter(
    (obj) => obj.commentBy === user.id
  );
  const [myComments, setMyComments] = useState(initialMyComments);
  const commentBoxRef = useRef(null);
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
  const likePost = async () => {
    try {
      const likeStatus = await likePostFn(post._id, user.token);
      if (likeStatus === "ok") {
        if (like) {
          setLikeCount((prev) => prev - 1);
        } else {
          setLikeCount((prev) => prev + 1);
        }
        setLike((prev) => !prev);
      }
    } catch (error) {}
  };
  const postComment = async () => {
    try {
      setCommentLoading(true);
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        { postId: post._id, comment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCommentLoading(false);
      setCommentCount((prev) => prev + 1);
      setMyComments((prev) => [
        ...prev,
        { comment, commentBy: user.id, commentAt: new Date() },
      ]);
      setComment("");
    } catch (error) {
      setCommentLoading(false);
    }
  };

  return (
    <div className="post">
      <div className="post_wrapper">
        <div className="post_header">
          <Link
            to={`/profile/${post.user.username}`}
            className="post_header_left"
          >
            <img src={post.user.picture} alt="" />
            <div className="header_col">
              <div className="post_profile_name">
                {`${post.user.first_name} ${post.user.last_name}`}
                <div className="updated_p">
                  {post.type === "profilePicture" &&
                    `updated ${
                      post.gender === "male" ? "his" : "her"
                    } profile picture`}
                  {post.type === "cover" &&
                    `updated ${
                      post.gender === "male" ? "his" : "her"
                    } cover picture`}
                </div>
              </div>
              <div className="post_profile_date">
                <Moment fromNow interval={30}>
                  {post.createdAt}
                </Moment>
              </div>
            </div>
          </Link>
          <div className="post_header_right hover1">
            <Dots color="#828387" />
          </div>
        </div>
        {post.background ? (
          <div
            className="post_bg"
            style={{ backgroundImage: `url(${post.background})` }}
          >
            <div className="post_bg_text">{post.text}</div>
          </div>
        ) : (
          <>
            {post.images && post.images.length && (
              <div className="grid_1">
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
            )}
          </>
        )}
        <div className="post_actions">
          <div className="post_action">
            {!like && (
              <svg
                onClick={likePost}
                className="post_reaction_icon"
                viewBox="0 0 512 512"
              >
                <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
              </svg>
            )}
            {like && (
              <svg
                onClick={likePost}
                className="post_reaction_icon"
                viewBox="0 0 512 512"
              >
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
              </svg>
            )}
          </div>
          <div className="post_action">
            <svg
              onClick={() => {
                commentBoxRef.current.select();
              }}
              className="post_reaction_icon"
              viewBox="0 0 512 512"
            >
              <path d="M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.98c0 9.836 11.02 15.55 19.12 9.7l124.9-93.68h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM464 352c0 8.75-7.25 16-16 16h-160l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16V352z" />
            </svg>
          </div>
        </div>
        {/* {post.text && <div className="post_text">{post.text}</div>} */}
        <div className="like_comment">
          {likeCount !== 0 && <span className="">{likeCount} likes</span>}
          {commentCount !== 0 && (
            <span className="">{commentCount} comments</span>
          )}
          <img src="" alt="" />
        </div>
        {post.text && post.text.length < 106 && (
          <div className="post_caption">
            <div>{post.text}</div>
          </div>
        )}
        {post.text && post.text.length >= 106 && (
          <div className="post_caption">
            <div>
              {post.text.slice(0, 105)}
              <span>...</span>
              <span className="more_option">more</span>
            </div>
          </div>
        )}
        <div className="comment_box">
          <div className="comment_wrapper">
            <svg className="emoji_svg" viewBox="0 0 512 512">
              <path d="M256 352C293.2 352 319.2 334.5 334.4 318.1C343.3 308.4 358.5 307.7 368.3 316.7C378 325.7 378.6 340.9 369.6 350.6C347.7 374.5 309.7 400 256 400C202.3 400 164.3 374.5 142.4 350.6C133.4 340.9 133.1 325.7 143.7 316.7C153.5 307.7 168.7 308.4 177.6 318.1C192.8 334.5 218.8 352 256 352zM208.4 208C208.4 225.7 194 240 176.4 240C158.7 240 144.4 225.7 144.4 208C144.4 190.3 158.7 176 176.4 176C194 176 208.4 190.3 208.4 208zM304.4 208C304.4 190.3 318.7 176 336.4 176C354 176 368.4 190.3 368.4 208C368.4 225.7 354 240 336.4 240C318.7 240 304.4 225.7 304.4 208zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
            </svg>
            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type="text"
              placeholder="Add a comment..."
              maxLength="130"
              ref={commentBoxRef}
            />
          </div>
          <button
            disabled={commentLoading}
            onClick={postComment}
            className="hover2"
          >
            Post
          </button>
        </div>
        {commentCount !== 0 && myComments.length !== 0 && (
          <div className="comment_display">
            <div className="comment_display_wrapper">
              <div className="comment_display_header">Comments</div>
              <div className="all_comment_wrap">
                {myComments.map((commentObj) => (
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
                      <pre className="comment_text">
                        {` ${commentObj.comment}`}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
