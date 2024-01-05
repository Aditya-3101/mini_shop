import React from "react";
import { Outlet } from "react-router";
import { redirect } from "react-router";

export const HomeLayout = () => {
  const isLoggedin = localStorage.getItem("AUTH_TOKEN");
  if (isLoggedin) {
    return <Outlet />;
  } else {
    throw redirect("/");
  }
};
