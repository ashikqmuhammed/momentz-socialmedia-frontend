import React from "react";
import { Return } from "../../svg";

export default function SearchMenu({ setShowSearchMenu }) {
  return (
    <div className="search_area">
      <div className="search_wrap">
        <div className="header_logo ">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return />
          </div>
        </div>
        <div className="search"></div>
      </div>
    </div>
  );
}
