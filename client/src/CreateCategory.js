import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCategory = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [catagory, setCatagory] = useState("");

  const handleChange = (e) => {
    setError("");
    setCatagory(e.target.value);
  };


  const submitData = (e)=>{
    e.preventDefault();

    setError("");
    setSuccess(false);

  }


  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Your Note has been posted Successfully!
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="form-design card">
            <form>
              <div className="text-center">
                <h5 className="text-center">Notebook app</h5>
                <h5 className="text-center">Create Category</h5>
                {showError()}
                {showSuccess()}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={catagory}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Income..."
                />
              </div>

              <div class="form-group justify-content-center align-items-center">
                <button
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                  onClick={(e) => {
                    submitData(e);
                  }}
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default CreateCategory;
