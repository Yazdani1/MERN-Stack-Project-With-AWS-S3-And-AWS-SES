import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const SecureLayout = ({ children }) => {
  let location = useLocation();

  const [userstate, setState] = useContext(UserContext);

  //   const auth = JSON.parse(localStorage.getItem('tokenLogin'));

  //   useEffect(() => {

  //   });

  //   if (!userstate && userstate.token && userstate.token) {
  //     return <Navigate to="/signin" state={{ from: location }} replace />;
  //   }

  //   const auth = JSON.parse(localStorage.getItem("tokenLogin"));

  // return auth?.user ? children : <Navigate to="/signin" replace state={{ from: location }}/>;

  return userstate?.user ? (
    <> {children}</>
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default SecureLayout;
