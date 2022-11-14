import "./style.css";
import React, { useRef, useState } from "react";
import { useClickOutside } from "../../helpers/useClickOutside";
import ImagePreview from "./ImagePreview";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import { Photo } from "../../svg";
import PulseLoader from "react-spinners/PulseLoader";
import { createPost } from "../../functions/post";
import PostError from "./PostError";
import dataUrlToBlob from "../../helpers/dataUrlToBlob";
import { uploadImages } from "../../functions/uploadImages";

export default function CreatePostPopup({
  setCreatePostPopup,
  user,
  dispatch,
  posts,
}) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const popupRef = useRef(null);
  useClickOutside(popupRef, () => setCreatePostPopup(false));

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === "ok") {
        setText("");
        setBackground("");
        setCreatePostPopup(false);
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: [response.data, ...posts],
        });
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const blobImages = images.map((img) => {
        return dataUrlToBlob(img);
      });
      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append("path", path);
      blobImages.forEach((img) => {
        formData.append("file", img);
      });
      const cloudinaryData = await uploadImages(formData, user.token);
      const response = await createPost(
        null,
        null,
        text,
        cloudinaryData,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === "ok") {
        setText("");
        setCreatePostPopup(false);
        dispatch({ type: "REQUEST_SUCCESS", payload:[response?.data,...posts] });
      } else {
        setError(response);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === "ok") {
        setText("");
        setCreatePostPopup(false);
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: [response.data, ...posts],
        });
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };

  return (
    <div className="blur">
      <div className="post_box" ref={popupRef}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => setCreatePostPopup(false)}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              user={user}
              text={text}
              setText={setText}
              showPrev={showPrev}
              background={background}
              setBackground={setBackground}
            />
          </>
        ) : (
          <ImagePreview
            user={user}
            text={text}
            setText={setText}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <div
          onClick={() => {
            setShowPrev((prev) => !prev);
          }}
          className="addtoyourpost"
        >
          <div className="post_header_right hover1">
            <Photo color="#45bd62" />
          </div>
        </div>
        <button
          onClick={() => {
            postSubmit();
          }}
          disabled={loading}
          className="post_button"
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
}
