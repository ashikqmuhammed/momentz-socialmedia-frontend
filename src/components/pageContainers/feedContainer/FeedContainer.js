import "./style.css";
import CreatePost from "../../createPost";
import Post from "../../post";

export default function FeedContainer({ setCreatePostPopup, user, posts }) {
  return (
    <div className="page_container scrollbar">
      <div className="home_wrapper">
        <div className="posts_wrapper">
          <CreatePost user={user} setCreatePostPopup={setCreatePostPopup} />
          <div className="posts">
            {posts?.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
