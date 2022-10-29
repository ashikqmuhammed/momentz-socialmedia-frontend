import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { unfollow } from "../../functions/user";
import "./style.css";

export default function FollowerBox({
  connection,
  setConnections,
  connections,
  following,
}) {
  const { user } = useSelector((state) => ({ ...state }));

  const unfollowFn = async (unfollowingId) => {
    try {
      const response = await unfollow(unfollowingId, user.token);
      console.log(response, "laaaaaaaaaa");
      if (response === "ok") {
        const newFollowings = connections.filter(
          (person) => person._id !== unfollowingId
        );
        setConnections(newFollowings);
      }
    } catch (error) {}
  };
  return (
    <div className="follower_box">
      <div className="follower_pic_wrap">
        <img src={connection.picture} alt="" />
      </div>
      <div className="follower_action_buttons">
        <div className="follower_box_name">{`${connection?.first_name} ${connection?.last_name}`}</div>
        <div className="action_link_box">
          <div className="action_wrapper">
            <button>Message</button>
            {!following && <button>Remove</button>}
            {following && (
              <button
                onClick={() => {
                  unfollowFn(connection._id);
                }}
              >
                Unfollow
              </button>
            )}
          </div>
          <Link to="/followers">Go to profile</Link>
        </div>
      </div>
    </div>
  );
}
