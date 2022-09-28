import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NonLoggedInRoutes() {
  const { user } = useSelector((state) => {
    return { ...state };
  });
  return <>{user ? <Navigate to="/" /> : <Outlet />}</>;
}
