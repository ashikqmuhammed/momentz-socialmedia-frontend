import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PicCroper from "./PicCroper";
import "./style.css";

export default function ProfileBox({ profile }) {
  const [edit, setEdit] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
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
        {!edit && (
          <div className="data_wrap">
            <div className="profile_name_edit">
              <span className="name">{`${profile?.first_name} ${profile?.last_name}`}</span>
              <button>Edit</button>
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
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec qu
              </div>
            </div>
          </div>
        )}
        {edit && <div className="edit_wrap"></div>}
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
