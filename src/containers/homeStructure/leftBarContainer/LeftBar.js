import "./style.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Tabs({ title, link, pathD, viewBox, page }) {
  return (
    <NavLink
      to={link}
      className={`layout_tabs ${page === title ? "active_tab" : ""}`}
    >
      <svg viewBox={viewBox}>
        <path d={pathD} />
      </svg>
      <span>{title}</span>
    </NavLink>
  );
}
export default function LeftBar({ page }) {
  const { user } = useSelector((state) => ({ ...state }));
  const tabs = [
    {
      title: "Feed",
      link: "/",
      pathD:
        "M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM128 416c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z",
      viewBox: "0 0 448 512",
    },
    {
      title: "Chat",
      link: "/chat",
      pathD:
        "M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.98c0 9.836 11.02 15.55 19.12 9.7l124.9-93.68h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM464 352c0 8.75-7.25 16-16 16h-160l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16V352z",
      viewBox: "0 0 512 512",
    },
    {
      title: "Explore",
      link: "/explore",
      pathD:
        "M306.7 325.1L162.4 380.6C142.1 388.1 123.9 369 131.4 349.6L186.9 205.3C190.1 196.8 196.8 190.1 205.3 186.9L349.6 131.4C369 123.9 388.1 142.1 380.6 162.4L325.1 306.7C321.9 315.2 315.2 321.9 306.7 325.1V325.1zM255.1 224C238.3 224 223.1 238.3 223.1 256C223.1 273.7 238.3 288 255.1 288C273.7 288 288 273.7 288 256C288 238.3 273.7 224 255.1 224V224zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z",
      viewBox: "0 0 512 512",
    },
  ];
  const tabs_follow = [
    {
      title: "Followers",
      link: "/followers",
      pathD:
        "M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z",
      viewBox: "0 0 640 512",
    },
    {
      title: "Following",
      link: "/following",
      pathD:
        "M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z",
      viewBox: "0 0 640 512",
    },
  ];

  return (
    <div className="left_bar_container">
      <div className="left_wrapper">
        <div className="first">
          <NavLink to="/profile" className="profile_box_left">
            <img src={user?.picture} alt="" />
            <div className="name_profession_wrapper">
              <div className="name">{`${user?.first_name} ${user?.last_name}`}</div>
              <div className="profession">
                <span>online</span> <div className="active_green"></div>
              </div>
            </div>
          </NavLink>
        </div>

        <div className="second">
          {tabs.map((tab, i) => (
            <Tabs
              key={i}
              title={tab.title}
              link={tab.link}
              pathD={tab.pathD}
              viewBox={tab.viewBox}
              page={page}
            />
          ))}
        </div>
        <div className="third">
          {tabs_follow.map((tab, i) => (
            <Tabs
              key={i}
              title={tab.title}
              link={tab.link}
              pathD={tab.pathD}
              viewBox={tab.viewBox}
              page={page}
            />
          ))}
        </div>
      </div>

    
    </div>
  );
}
