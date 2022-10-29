import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FollowerBox from "../../components/followerComponent/FollowerBox";

import "./style.css";

const array = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

export default function FollowingContainer() {
  const { user } = useSelector((state) => ({ ...state }));

  const [following, setFollowing] = useState([]);
  const fetchFollowing = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/following`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setFollowing(data);
  };

  useEffect(() => {
    fetchFollowing();
  }, []);

  return (
    <div className="following_container scrollbar">
      <div className="following_wrapper">
        {following.map((following) => (
          <FollowerBox following key={following._id} connection={following} />
        ))}
      </div>
    </div>
  );
}
