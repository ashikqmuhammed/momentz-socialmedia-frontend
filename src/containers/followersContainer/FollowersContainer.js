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

  return (
    <div className="followers_container scrollbar">
      <div className="followers_wrapper">
        {array.map((item) => (
          <FollowerBox />
        ))}
      </div>
    </div>
  );
}
