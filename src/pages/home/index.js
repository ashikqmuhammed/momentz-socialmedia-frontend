import { useSelector } from "react-redux";
import FeedContainer from "../../containers/feedContainer/FeedContainer";
import Header from "../../containers/homeStructure/headerContainer";
import LeftBar from "../../containers/homeStructure/leftBarContainer/LeftBar";
import RightBar from "../../containers/homeStructure/rightBarContainer/RightBar";

import "./style.css";

export default function Home({ setCreatePostPopup, posts, setChat }) {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="home">
      <Header page="home" setChat={setChat} />
      <LeftBar />
      <FeedContainer
        posts={posts}
        user={user}
        setCreatePostPopup={setCreatePostPopup}
      />

      <RightBar />
    </div>
  );
}
