import axios from "axios";



export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/create-post`,
      {
        type,
        background,
        text,
        images,
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const likePostFn = async (postId, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/like`,
      {
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const galleryPostsFn = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/gallery-posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};
