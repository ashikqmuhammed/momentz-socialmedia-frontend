import "./style.css";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../../svg";
import SearchMenu from "./SearchMenu";

export default function Header() {
  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <img src="./icons/favicon.png" />
          </div>
        </Link>
        <div
          className="search"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input type="text" placeholder="Search Moments" />
        </div>
      </div>
      {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} />}
      <div className="header_middle"></div>
      <div className="header_right"></div>
    </header>
  );
}
