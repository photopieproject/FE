import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const layoutStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#fffaf2",
    width: "100%",
    maxWidth: "1920px",
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
