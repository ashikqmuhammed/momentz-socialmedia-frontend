import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NonLoggedInRoutes from "./routes/NonLoggedInRoutes";
import { useEffect, useReducer, useState } from "react";
import CreatePostPopup from "./components/createPostPopup";
import { useSelector } from "react-redux";
import axios from "axios";
import Chat from "./pages/chat";
import Relations from "./pages/relations";
import Gallery from "./pages/gallery/Gallery";
import Followers from "./pages/followers/Followers";
import Following from "./pages/following/Following";

function postFetchReducer(state, action) {
  switch (action.type) {
    case "REQUEST_STARTED":
      return { ...state, loading: true, error: "" };
    case "REQUEST_SUCCESS":
      return { ...state, loading: false, error: "", posts: action.payload };
    case "REQUEST_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function App() {
  const [createPostPopup, setCreatePostPopup] = useState(false);
  const [chat, setChat] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [{ loading, error, posts }, dispatch] = useReducer(postFetchReducer, {
    loading: false,
    error: "",
    posts: [],
  });
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user || newPost) {
      getAllPosts();
    }
  }, [newPost, user]);

  const getAllPosts = async () => {
    try {
      dispatch({ type: "REQUEST_STARTED" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/get-all-posts`,
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
  return (
    <div className="app">
      {createPostPopup && (
        <CreatePostPopup
          setNewPost={setNewPost}
          user={user}
          setCreatePostPopup={setCreatePostPopup}
        />
      )}
      {chat && <Chat setChat={setChat} user={user} />}

      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile/:username"
            element={
              <Profile
                setCreatePostPopup={setCreatePostPopup}
                setNewPost={setNewPost}
                user={user}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                setCreatePostPopup={setCreatePostPopup}
                setNewPost={setNewPost}
                user={user}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                setCreatePostPopup={setCreatePostPopup}
                setChat={setChat}
                posts={posts}
              />
            }
            exact
          />
          <Route path="/chat" element={<Chat />} exact />
          <Route path="/followers" element={<Followers />} exact />
          <Route path="/following" element={<Following />} exact />
          <Route path="/gallery" element={<Gallery />} exact />

          <Route
            path="/relations"
            element={<Relations setChat={setChat} />}
            exact
          />
        </Route>
        <Route element={<NonLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
