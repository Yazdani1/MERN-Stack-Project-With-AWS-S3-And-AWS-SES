import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
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
              <h5 className="text-center">Log In to Your Account</h5>
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
  )
}

export default SignIn