import ProfileBox from "../../components/profileComponents/profileBox/ProfileBox";
import "./style.css";

export default function ProfileContainer() {
  return (
    <div className="profile_container">
      <div className="profile_wrapper">
        <ProfileBox />
      </div>
    </div>
  );
}
