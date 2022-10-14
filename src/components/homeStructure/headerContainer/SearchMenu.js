import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../../../functions/user";
import { useClickOutside } from "../../../helpers/useClickOutside";
import { Return, Search } from "../../../svg";

export default function SearchMenu({ setShowSearchMenu, color, token }) {
  const searchInputRef = useRef(null);
  const searchRef = useRef(null);
  const [showIcon, setShowIcon] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useClickOutside(searchRef, () => {
    setShowSearchMenu(false);
  });
  const searchHandler = async () => {
    if (searchTerm === "") {
      setSearchTerm("");
    } else {
      const res = await search(searchTerm, token);
      setResults(res);
    }
  };
  console.log(results);
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
            value={searchTerm}
            type="text"
            placeholder="Search Moments"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onFocus={() => {
              setShowIcon(false);
            }}
            onBlur={() => {
              setShowIcon(true);
            }}
            onKeyUp={searchHandler}
          />
        </div>
      </div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
