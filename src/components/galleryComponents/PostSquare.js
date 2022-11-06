import { Link } from "react-router-dom";

import "./style.css";

export default function PostSquare({ imageSrc, post }) {
  return (
    <Link to={`/post/${post?._id}`}>
      <img className="post_square" loading="lazy" src={imageSrc} alt="" />
    </Link>
  );
}
