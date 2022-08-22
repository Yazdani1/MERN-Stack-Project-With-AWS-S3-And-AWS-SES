import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const SecureLayout = ({ children }) => {
  let location = useLocation();

  const [state, setState] = useContext(UserContext);

//   const auth = JSON.parse(localStorage.getItem('token'));


  useEffect(() => {
    if (!state && state.token && state.token) {
        return <Navigate to="/signin" state={{ from: location }}  />;
      }
  });




  return (
    <>
      <Navbar />

      return <Navigate to="/signin" state={{ from: location }}  replace/>;


      {/* return auth?.user ? children : <Navigate to="/signin" />; */}


      {children}
    </>
  );
};

export default SecureLayout;
