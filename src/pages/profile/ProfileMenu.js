import React from "react";
import { Link } from "react-router-dom";
import { Dots } from "../../svg";

export default function ProfileMenu({ visitor }) {
  return (
    <div>
      <div className="profile_menu_wrap">
        <div className="profile_menu">
          <Link to="/" className="profile_menu_active">
            My Posts
          </Link>
          <Link to="/" className="hover1">
            Saved Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
