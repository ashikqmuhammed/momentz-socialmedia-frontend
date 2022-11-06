import "./style.css";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { Search } from "../../../svg";

export default function Header({ page }) {
  const { user, darkTheme } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const changeTheme = () => {
    if (darkTheme) {
      Cookies.set("darkTheme", false);
      dispatch({ type: "LIGHT" });
    } else {
      Cookies.set("darkTheme", true);
      dispatch({ type: "DARK" });
    }
  };
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <img alt="logo" src="./icons/favicon.png" />
          </div>
        </Link>
        <Link to="/">
          <h3 className="moments_text">MOMENTS</h3>
        </Link>
      </div>
      <div className="search_wrapper">
        <div
          className="search"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input type="text" placeholder="Search Moments" />
        </div>

        {!open && (
          <svg
            className="hamburger"
            onClick={() => {
              setOpen(true);
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        )}
        {open && (
          <svg
            onClick={() => {
              setOpen(false);
            }}
            className="hamburger"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        )}
      </div>
      <div className="header_right">
        <div
          onClick={changeTheme}
          className={darkTheme ? "dark_mode" : "light_mode"}
        >
          <svg viewBox="0 0 512 512">
            <path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zm64 0c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256z" />
          </svg>
        </div>

        <div className="open_user_menu_large">
          <img
            src={user?.picture}
            alt="profile pic"
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          />
          {showUserMenu && <UserMenu />}
        </div>
      </div>
    </header>
  );
}
