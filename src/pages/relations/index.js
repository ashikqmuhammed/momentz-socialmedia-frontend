import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { relationsReducer } from "../../functions/reducers";
import { getRelationsPageInfos } from "../../functions/user";
import { useSelector } from "react-redux";
import Header from "../../components/homeStructure/headerContainer";

export default function Relations({ setChat }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, error, data }, dispatch] = useReducer(relationsReducer, {
    loading: false,
    data: {},
    error: "",
  });

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    dispatch({ type: "RELATIONS_REQUEST" });
    const data = await getRelationsPageInfos(user.token);
    if (data.status === "ok") {
      dispatch({ type: "RELATIONS_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "RELATIONS_ERROR", payload: data.data });
    }
  };
  return (
    <>
      <Header page="relations" setChat={setChat} />
      <div className="relations">
        <div className="relations_left">
          <div className="relations_left_header">
            <h3>Relations</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="relations_left_wrap">
            <Link to="/relations/all" className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Mutual Followers</span>
              {/* <div className="rArrow">
                <i className="right_icon"></i>
              </div> */}
            </Link>
            <Link to="/relations/sent" className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Followers</span>
              {/* <div className="rArrow">
                <i className="right_icon"></i>
              </div> */}
            </Link>
            <Link to="/relations/requests" className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Following</span>
              {/* <div className="rArrow">
                <i className="right_icon"></i>
              </div> */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
