import React from "react";
import Navbar from "./Navbar";

const PageLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};

export default PageLayout;

