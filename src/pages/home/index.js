import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import HomeLeft from "../../components/homeLayout/HomeLeft";
import HomeRight from "../../components/homeLayout/HomeRight";
import Post from "../../components/post";
import "./style.css";

export default function Home({ setCreatePostPopup, posts, setChat }) {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="home">
      <Header page="home" setChat={setChat} />
      <HomeLeft />
      <div className="home_middle">
        <CreatePost user={user} setCreatePostPopup={setCreatePostPopup} />
        <div className="posts">
          {posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </div>
      </div>
      <HomeRight />
    </div>
  );
}
