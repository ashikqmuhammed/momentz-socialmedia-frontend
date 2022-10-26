import { Link } from "react-router-dom";

import "./style.css";

export default function PostSquare({ imageSrc }) {
  return (
    <Link to="/gallery">
    
     
      <img className="post_square" loading="lazy" src={imageSrc} alt="" />
    </Link>
  );
}
