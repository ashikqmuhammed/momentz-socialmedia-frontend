import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { follow, unfollow } from "../../functions/user";

export default function Relationship({ relationShipObject, profileId }) {
  const [relationShip, setRelationShip] = useState(relationShipObject);
  const { user } = useSelector((state) => ({ ...state }));

  const followHandler = async () => {
    await follow(profileId, user.token);
    setRelationShip((prev) => {
      return { ...prev, following: true };
    });
  };

  const unfollowHandler = async () => {
    await unfollow(profileId, user.token);
    setRelationShip((prev) => {
      return { ...prev, following: false };
    });
  };

  useEffect(() => {
    setRelationShip(relationShipObject);
  }, [relationShipObject]);
  return (
    <div className="friendship">
      <div className="flex">
        {relationShip?.following && relationShip.follower && (
          <button className="gray_btn">
            <img src="../../../icons/message.png" className={"invert"} alt="" />
            <span>Message</span>
          </button>
        )}
        {relationShip?.following ? (
          <button className="gray_btn" onClick={unfollowHandler}>
            <img src="../../../icons/follow.png" alt="" />
            <span>Following</span>
          </button>
        ) : !relationShip?.following && relationShip?.follower ? (
          <button className="blue_btn" onClick={followHandler}>
            <img src="../../../icons/follow.png" className="invert" alt="" />
            <span>Follow back</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={followHandler}>
            <img src="../../../icons/follow.png" className="invert" alt="" />
            <span>Follow</span>
          </button>
        )}
      </div>
    </div>
  );
}
