import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userRegistration } from "../API";
const axios = require("axios");

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async (e) => {
    e.preventDefault();

    try {

      const res = await userRegistration({ name, email, password });

      if (res) {
        toast.success("Account Successfully Created", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast.success(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });

      // setError(error.response && error.response.data.error);
    }
  };

  return (
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
                <h5 className="text-center">Create Your Account</h5>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  onClick={(e) => createAccount(e)}
                >
                  Sign Up
                </button>
              </div>
              <div className="text-center form-bottom-title">
                <Link to={"/signin"} style={{ textDecoration: "none" }}>
                  <p>Already have an account? Sign In</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default SignUp;
