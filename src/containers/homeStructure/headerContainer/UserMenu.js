import Cookies from "js-cookie";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useClickOutside } from "../../../helpers/useClickOutside";

export default function UserMenu({setShowUserMenu}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const menuRef=useRef()
  useClickOutside(menuRef, () => {
    setShowUserMenu(false)
  });
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <div className="user_menu" ref={menuRef}>
      <div className="user_menu_box">
        <Link className="user_menu_tabs hover1" to="/profile">
          <img src={user?.picture} alt="" />
          <div>
            <span>
              {user?.first_name}
              {user?.last_name}
            </span>
          </div>
        </Link>
        <div onClick={logout} className="user_menu_tabs">
          <div className="logout_circle">
            <i className="logout_filled_icon"></i>
          </div>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
