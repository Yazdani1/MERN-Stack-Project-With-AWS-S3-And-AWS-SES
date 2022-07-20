import React from "react";
import Navbar from "./Navbar";

const PageLayout = (props) => {
  let Cmprops = props.FrontProtected;

  return (
    <div>
      <Navbar />
      <Cmprops/>
    </div>
  );
};

export default PageLayout;
