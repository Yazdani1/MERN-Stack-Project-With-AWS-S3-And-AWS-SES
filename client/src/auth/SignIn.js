import React, { useState, useContext, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
// import { userLoginDetails } from "../API";
import { useDispatch } from "react-redux";
import PageLayout from "../PageLayout";
import { UserContext } from "../UserContext";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
} from "../redux/userSlice";

const axios = require("axios");

const SignIn = () => {
  let location = useLocation();

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // to use contextApi
  const [state, setState] = useContext(UserContext);

  // to use redux-toolkit

  const dispatch = useDispatch();

  const signIn = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (res) {
        toast.success("Log In Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setEmail("");
        setPassword("");

        // update user information into context api
        setState({
          user: res.data.user,
          token: res.data.token,
        });

        //to add user information in redux

        dispatch(loginSuccess(res.data));

        // save user info in local storage
        window.localStorage.setItem("tokenLogin", JSON.stringify(res.data));
        window.localStorage.setItem("token", res.data.token);

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(loginFailure());
    }
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="form-design card">
              <form>
                <div className="text-center">
                  <img
                    src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/lotus.png"
                    style={{ width: "185px" }}
                    alt="logo"
                  />
                  <h5 className="text-center">Log In to Your Account</h5>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="name"
                    className="form-control"
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div class="form-group justify-content-center align-items-center">
                  <button
                    type="submit"
                    className="btnContact"
                    value="Sign In"
                    onClick={(e) => {
                      signIn(e);
                    }}
                  >
                    Sign In
                  </button>
                </div>
                <div className="text-center form-bottom-title">
                  <Link to={"/signup"} style={{ textDecoration: "none" }}>
                    <p>Dont have an account? Sign Up</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default SignIn;
