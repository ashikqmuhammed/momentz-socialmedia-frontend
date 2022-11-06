import { useSelector } from "react-redux";
import FeedContainer from "../../containers/feedContainer/FeedContainer";


import "./style.css";

export default function Home({ setCreatePostPopup, posts }) {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <FeedContainer
        posts={posts}
        user={user}
        setCreatePostPopup={setCreatePostPopup}
      />
    </div>
  );
}
