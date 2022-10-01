import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NonLoggedInRoutes from "./routes/NonLoggedInRoutes";
import { useState } from "react";
import CreatePostPopup from "./components/createPostPopup";
import { useSelector } from "react-redux";
function App() {
  const [createPostPopup, setCreatePostPopup] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      {createPostPopup && (
        <CreatePostPopup user={user} setCreatePostPopup={setCreatePostPopup} />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route
            path="/"
            element={<Home setCreatePostPopup={setCreatePostPopup} />}
            exact
          />
        </Route>
        <Route element={<NonLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
