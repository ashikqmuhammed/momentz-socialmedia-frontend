import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import PostSquare from "../../components/galleryComponents/PostSquare";
import { galleryPostsFn } from "../../functions/post";
import { galleryReducer } from "../../functions/reducers";
import "./style.css";

export default function ExploreContainer() {
  const { user } = useSelector((state) => ({ ...state }));
  const [{ galleryError, galleryPosts, galleryLoading }, dispatch] = useReducer(
    galleryReducer,
    {
      galleryError: false,
      galleryPosts: [],
      galleryLoading: false,
    }
  );
  const galleryPostsFetch = async () => {
    try {
      dispatch({ type: "GALLERY_REQUEST" });
      const response = await galleryPostsFn(user.token);
      if ((response.status = "ok")) {
        const finalArray = response.data.filter(
          (post) => post.images.length !== 0
        );
        dispatch({ type: "GALLERY_SUCCESS", payload: finalArray });
      } else {
        dispatch({ type: "GALLERY_ERROR" });
      }
    } catch (error) {
      dispatch({ type: "GALLERY_ERROR" });
    }
  };
  useEffect(() => {
    galleryPostsFetch();
  }, []);
  return (
    <div className="gallery_container scrollbar">
      <div className="gallery_wrapper">
        {galleryPosts.map((post) => (
          <PostSquare
            key={post._id}
            post={post}
            imageSrc={post.images[0].url}
          />
        ))}
      </div>
    </div>
  );
}
