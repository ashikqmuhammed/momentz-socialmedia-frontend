import "./style.css";

export default function CreatePost({ user, setCreatePostPopup }) {
  return (
    <div
      className="create_post"
      onClick={() => {
        setCreatePostPopup(true);
      }}
    >
      <div className="create_post_header">
        {/* <img src={`${user.picture}`} alt="" /> */}
        <div className="open_post hover2">
          Share your moments..{user?.first_name}
        </div>
      </div>
    </div>
  );
}
