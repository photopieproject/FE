import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const layoutStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "82.5vh",
  paddingTop: "30px",
  backgroundColor: "#eee8dc",
};

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ ...layoutStyles }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
