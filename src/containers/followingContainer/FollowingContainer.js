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

  return (
    <div className="following_container scrollbar">
      <div className="following_wrapper">
        {array.map((item) => (
          <FollowerBox />
        ))}
      </div>
    </div>
  );
}
