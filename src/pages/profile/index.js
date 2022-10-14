import "./style.css";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import Cover from "./Cover";
import ProfileMenu from "./ProfileMenu";
import ProfilePictureInfos from "./ProfilePictureInfos";
import CreatePost from "../../components/createPost";
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "./Friends";
import Header from "../../components/homeStructure/headerContainer";

export default function Profile({ setCreatePostPopup, setNewPost }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  var userName = username === undefined ? user.username : username;

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  useEffect(() => {
    getProfile();
  }, [userName]);

  var visitor = userName === user.username ? false : true;

  const getProfile = async () => {
    try {
      dispatch({
        type: "REQUEST_STARTED",
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/profile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.ok === false) {
        navigate(`/profile`);
      } else {
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "REQUEST_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} visitor={visitor} />
          <ProfilePictureInfos profile={profile} visitor={visitor} />
          <ProfileMenu visitor={visitor} />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <div className="profile_grid">
              <div className="profile_left">
                <Photos token={user.token} username={userName} />
                <Friends friends={profile.friends} />
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost
                    user={user}
                    setCreatePostPopup={setCreatePostPopup}
                    setNewPost={setNewPost}
                  />
                )}
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
