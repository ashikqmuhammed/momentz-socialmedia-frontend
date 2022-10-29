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
export default function FollowersContainer() {
  const { user } = useSelector((state) => ({ ...state }));
  const [followers, setFollowers] = useState([]);
  const fetchFollowers = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/followers`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setFollowers(data);
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  return (
    <div className="followers_container scrollbar">
      <div className="followers_wrapper">
        {followers.map((follower) => (
          <FollowerBox
            key={follower._id}
            connection={follower}
            setConnections={setFollowers}
            connections={followers}
          />
        ))}
      </div>
    </div>
  );
}
