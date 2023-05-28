import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Fragment>
      <Header />
      <div style={{ minHeight: "100vh", overflow: "auto" }}>
        <Outlet />
      </div>

      <Footer />
    </Fragment>
  );
}
