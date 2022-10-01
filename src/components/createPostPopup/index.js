import "./style.css";
import React, { useRef, useState } from "react";
import { useClickOutside } from "../../helpers/useClickOutside";
import ImagePreview from "./ImagePreview";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import { Photo } from "../../svg";

export default function CreatePostPopup({ setCreatePostPopup, user }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(true);

  const popupRef = useRef(null);
  useClickOutside(popupRef, () => setCreatePostPopup(true));

  return (
    <div className="blur">
      <div className="post_box" ref={popupRef}>
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
            />
          </>
        ) : (
          <ImagePreview
            user={user}
            text={text}
            setText={setText}
            showPrev={showPrev}
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
        <button className="post_button">Post</button>
      </div>
    </div>
  );
}
