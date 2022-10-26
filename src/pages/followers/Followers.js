import "./style.css";
import Header from "../../containers/homeStructure/headerContainer";
import LeftBar from "../../containers/homeStructure/leftBarContainer/LeftBar";
import RightBar from "../../containers/homeStructure/rightBarContainer/RightBar";
import FollowersContainer from "../../containers/followersContainer/FollowersContainer";

export default function Followers() {
  return (
    <div>
      <Header />
      <LeftBar />
      <FollowersContainer />
      <RightBar />
    </div>
  );
}
