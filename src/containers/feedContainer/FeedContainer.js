import Post from "../../components/post";
import "./style.css";

export default function FeedContainer({ posts }) {
  return (
    <div className="feed_container scrollbar">
      <div className="home_wrapper">
        <div className="posts_wrapper">
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
