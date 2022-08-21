import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
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
                  // value={name}
                  // onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Email *"
                  // value={name}
                  // onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="name"
                  className="form-control"
                  placeholder="Password*"
                />
              </div>

              <div class="form-group justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btnContact"
                  value="Sign In"
                  // onClick={(e) => {
                  //   dataSubmit(e);
                  // }}
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
