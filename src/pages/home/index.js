import { useSelector } from "react-redux";
import FeedContainer from "../../containers/feedContainer/FeedContainer";


import "./style.css";

export default function Home({ posts }) {
 
  return (
    <div>
      <FeedContainer
        posts={posts}
      />
    </div>
  );
}
