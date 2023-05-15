import React, { Fragment } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}
