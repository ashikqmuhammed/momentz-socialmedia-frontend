import React, { useRef, useState } from "react";
import { useClickOutside } from "../../helpers/useClickOutside";
import { Return, Search } from "../../svg";

export default function SearchMenu({ setShowSearchMenu, color }) {
  const searchInputRef = useRef(null);
  const searchRef = useRef(null);
  const [showIcon, setShowIcon] = useState(true);
  useClickOutside(searchRef, () => {
    setShowSearchMenu(false);
  });
  return (
    <div ref={searchRef} className="header_left search_area scrollbar">
      <div className="search_wrap">
        <div className="header_logo ">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            searchInputRef.current.focus();
          }}
        >
          {showIcon && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Moments"
            onFocus={() => {
              setShowIcon(false);
            }}
            onBlur={() => {
              setShowIcon(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
