import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import HomeLeft from "../../components/homeLayout/HomeLeft";
import HomeRight from "../../components/homeLayout/HomeRight";
import Post from "../../components/post";
import "./style.css";

export default function Home({ setCreatePostPopup }) {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="home">
      <Header page="home" />
      <HomeLeft />
      <div className="home_middle">
        <CreatePost user={user} setCreatePostPopup={setCreatePostPopup} />
        <Post />
      </div>
      <HomeRight />
    </div>
  );
}
