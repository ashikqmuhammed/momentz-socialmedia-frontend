import React, { useState } from "react";
import ProfilePicture from "../../components/profilePicture";
import Relationship from "./Relationship";

export default function ProfilePictureInfos({ profile, visitor }) {
  const [show, setShow] = useState(false);
  return (
    <div className="profile_img_wrap">
      {show && <ProfilePicture setShow={setShow} />}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div
              onClick={() => setShow((prev) => !prev)}
              className="profile_circle hover1"
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
            <div className="othername"></div>
          </div>
          <div className="profile_friend_count"></div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {visitor && (
        <Relationship
          profileId={profile._id}
          relationShipObject={profile?.relationShipObject}
        />
      )}
    </div>
  );
}
