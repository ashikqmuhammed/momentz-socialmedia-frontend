import Post from "../../components/post";
import ProfileBox from "../../components/profileComponents/profileBox/ProfileBox";
import ProfileTabs from "../../components/profileComponents/profileTabs/ProfileTabs";
import "./style.css";

export default function ProfileContainer({ profile, visitor, setTab, tab }) {
  return (
    <div className="profile_container scrollbar">
      <div className="profile_wrapper">
        <div className="profile_topbox">
          <ProfileBox profile={profile} />
          <ProfileTabs setTab={setTab} tab={tab} visitor={visitor} />
        </div>

        <div className="posts_wrapper">
          <div className="posts">
            {profile.posts?.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
