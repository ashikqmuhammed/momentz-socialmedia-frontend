import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PicCroper from "./PicCroper";
import "./style.css";

export default function ProfileBox({ profile, visitor, profileId }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [edit, setEdit] = useState(false);

  const [isFollower, setIsFollower] = useState(false);
  console.log(isFollower);

  useEffect(() => {
    setIsFollower(profile?.followers?.includes(user.id));
  }, [profile]);

  const refInput = useRef();
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const pRef = useRef();
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <div className="profile_box">
      <div className="profile_pic_container">
        <img ref={pRef} src={profile.picture} alt="" />
        <div className="edit_dp_btn hover1">
          <i
            className="camera_filled_icon"
            onClick={() => {
              refInput.current.click();
            }}
          ></i>
        </div>
        <input
          type="file"
          ref={refInput}
          hidden
          onChange={handleImage}
          accept="image/jpeg,image/png,image/webp,image/gif"
        ></input>
      </div>
      <div className="profile_data_container">
        <div className="data_wrap">
          <div className="profile_name_edit">
            <span className="name">{`${profile?.first_name} ${profile?.last_name}`}</span>
            {!visitor && (
              <button
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit
              </button>
            )}
            {visitor && !isFollower && <button>Follow</button>}
            {visitor && isFollower && (
              <div className="p_following_icon">
                <svg viewBox="0 0 640 512">
                  <path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
              </div>
            )}
          </div>
          <div className="follow_count">
            <pre className="followers_count">100k followers</pre>
            <pre
              className="following_count
              "
            >
              100 following
            </pre>
          </div>
          <div className="bio_wrap">
            <div className="bio">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
        </div>
      </div>
      {image && (
        <PicCroper
          setImage={setImage}
          image={image}
          setError={setError}
          pRef={pRef}
        />
      )}
    </div>
  );
}
