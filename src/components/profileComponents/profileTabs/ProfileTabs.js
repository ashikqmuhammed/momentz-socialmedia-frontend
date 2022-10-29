import { NavLink } from "react-router-dom";
import "./style.css";

export default function ProfileTabs({ tab, visitor, setTab }) {
  return (
    <>
      {!visitor && (
        <div className="profile_tabs">
          <div
            className={tab[0] === 1 ? "active" : ""}
            onClick={() => {
              setTab([1, 0, 0]);
            }}
          >
            <svg viewBox="0 0 448 512">
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </div>
          <div
            className={tab[1] === 1 ? "active" : ""}
            onClick={() => {
              setTab([0, 1, 0]);
            }}
          >
            <svg viewBox="0 0 512 512">
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
          </div>
          <div
            className={tab[2] === 1 ? "active" : ""}
            onClick={() => {
              setTab([0, 0, 1]);
            }}
          >
            <svg viewBox="0 0 384 512">
              <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
