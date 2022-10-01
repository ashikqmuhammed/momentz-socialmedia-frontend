import React from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";

export default function ImagePreview({ user, text, setText }) {
  return (
    <div>
      <EmojiPickerBackgrounds user={user} text={text} setText={setText} type2 />
    </div>
  );
}
