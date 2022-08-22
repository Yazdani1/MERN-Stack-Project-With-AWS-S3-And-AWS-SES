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

// import React from "react";
// import Navbar from "./Navbar";

// const PageLayout = (props) => {
//   let Cmprops = props.FrontProtected;

//   return (
//     <div>
//       <Navbar />
//       <Cmprops/>
//     </div>
//   );
// };

// export default PageLayout;
