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
import Followers from "./pages/followers/Followers";
import Following from "./pages/following/Following";
import Header from "./containers/homeStructure/headerContainer";
import Chat from "./pages/chat/Chat";
import LeftBar from "./containers/homeStructure/leftBarContainer/LeftBar";
import RightBar from "./containers/homeStructure/rightBarContainer/RightBar";
import Explore from "./pages/gallery/Explore";
import SingleViewPost from "./components/singleViewPost/SingleViewPost";
import BottomBar from "./containers/homeStructure/bottomBar/BottomBar";
import { useMediaQuery } from "react-responsive";

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
  const mobileView = useMediaQuery({
    query: "(max-width: 480px)",
  });
  console.log(mobileView);
  const [newPost, setNewPost] = useState(false);
  const [{ loading, error, posts }, dispatch] = useReducer(postFetchReducer, {
    loading: false,
    error: "",
    posts: [],
  });
  const { user, darkTheme } = useSelector((state) => ({ ...state }));

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
    <div className={darkTheme ? "dark" : ""}>
      {user && (
        <>
          <Header page="home" />
          <LeftBar />
          <RightBar />
          {mobileView && <BottomBar />}
        </>
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/">
            <Route
              index
              element={
                <Home setCreatePostPopup={setCreatePostPopup} posts={posts} />
              }
            />
            <Route
              path="post/:postId"
              element={
                <>
                  {/* <Home setCreatePostPopup={setCreatePostPopup} posts={posts} /> */}
                  <SingleViewPost />
                </>
              }
            />
          </Route>
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
                posts={posts}
              />
            }
          />
          <Route
            path="/profile/liked"
            element={
              <Profile
                setCreatePostPopup={setCreatePostPopup}
                setNewPost={setNewPost}
                user={user}
                posts={posts}
                liked
              />
            }
          />

          <Route path="/chat" element={<Chat />} exact />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="*" element={<h1 className="testing">Not found</h1>} />
        </Route>
        <Route element={<NonLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
      {createPostPopup && (
        <CreatePostPopup
          setNewPost={setNewPost}
          user={user}
          setCreatePostPopup={setCreatePostPopup}
        />
      )}
    </div>
  );
}

export default App;
