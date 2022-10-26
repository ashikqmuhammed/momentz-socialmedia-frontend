import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Messenger } from "../../svg";
import RemoveFollower from "../../svg/removeFollower";
import "./style.css";

export default function FollowerBox({ imageSrc }) {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="follower_box">
      <div className="follower_pic_wrap">
        <img src={user.picture} alt="" />
      </div>
      <div className="follower_action_buttons">
        <div className="follower_box_name">{`${user?.first_name} ${user?.last_name}`}</div>
        <div className="action_link_box">
          <div className="action_wrapper">
            <button>Message</button>
            <button>Remove</button>
          </div>
          <Link to="/followers">Go to profile</Link>
        </div>
      </div>
    </div>
  );
}
