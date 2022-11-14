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
    const { data } = await axios.post(
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
    return { status: "ok", data };
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

export const getAllPosts = async (dispatch, user) => {
  try {
    dispatch({ type: "REQUEST_STARTED" });
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/get-following-posts`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    dispatch({ type: "REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "REQUEST_FAILURE",
      payload: error.response.data.message,
    });
  }
};
