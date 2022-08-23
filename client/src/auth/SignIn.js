import { Link, NavLink } from "react-router-dom";
import React, { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../UserContext";
import { ToastContainer, toast } from "react-toastify";
import { userLogin } from "../API";
import PageLayout from "../PageLayout";
import { Navigate, useLocation,useNavigate } from "react-router-dom";

const axios = require("axios");

const SignIn = () => {

  let location = useLocation();

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useContext(UserContext);

  // const history = useHistory();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const res = await userLogin({ email, password });

      if (res) {
        toast.success("Log In Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setEmail("");
        setPassword("");

    
        // update user information
        setState({
          user: res.data.user,
          token: res.data.token,
        });

        // save user info in local storage
        window.localStorage.setItem("tokenLogin", JSON.stringify(res.data));
        window.localStorage.setItem("token", res.data.token);

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });

      // setError(error.response && error.response.data.error);
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
