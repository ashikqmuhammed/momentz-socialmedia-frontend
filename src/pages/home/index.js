import { useSelector } from "react-redux";
import Header from "../../components/homeStructure/headerContainer";
import LeftBar from "../../components/homeStructure/leftBarContainer/LeftBar";
import RightBar from "../../components/homeStructure/rightBarContainer/RightBar";
import FeedContainer from "../../components/pageContainers/feedContainer/FeedContainer";
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
