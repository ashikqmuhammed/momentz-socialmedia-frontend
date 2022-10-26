import "./style.css";
import Header from "../../containers/homeStructure/headerContainer";
import LeftBar from "../../containers/homeStructure/leftBarContainer/LeftBar";
import RightBar from "../../containers/homeStructure/rightBarContainer/RightBar";
import FollowingContainer from "../../containers/followingContainer/FollowingContainer";

export default function Following() {
  return (
    <div>
      <Header />
      <LeftBar />
      <FollowingContainer />
      <RightBar />
    </div>
  );
}
