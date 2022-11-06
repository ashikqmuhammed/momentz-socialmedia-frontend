import "./style.css";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import ProfileContainer from "../../containers/profileContainer/ProfileContainer";

export default function Profile({
  setCreatePostPopup,
  setNewPost,
  posts,
  liked,
}) {
  const [tab, setTab] = useState([1, 0, 0]);
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
  }, [userName, tab]);

  var visitor = userName === user.username ? false : true;

  const getProfile = async () => {
    try {
      dispatch({
        type: "REQUEST_STARTED",
      });
      if (tab[1]) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/profile/${userName}/likedposts`,
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
      } else {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/profile/${userName}/ownposts`,
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
      }
    } catch (error) {
      dispatch({
        type: "REQUEST_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div>
      <ProfileContainer
        tab={tab}
        setTab={setTab}
        profile={profile}
        visitor={visitor}
      />
    </div>
  );
}
