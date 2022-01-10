import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Post = ({totalpost}) => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setError("");
    setTitle(e.target.value);
  };

  const handleChangedes = (e) => {
    setError("");
    setDes(e.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ title, des }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
          console.log(result.error);
        } else {
          setError("");
          setSuccess(true);
          setTitle("");
          setDes("");

          toast.success("Post created Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

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
      Your Comment has been posted Successfully!
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="form-design card">
            <form>
              <div className="text-center">
                <h5 className="text-center">Write Your Note</h5>
                <p>Total Note is: {totalpost.length}</p>
                {showError()}
                {showSuccess()}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Title..."
                />
              </div>
              <div className="form-group">
                <textarea
                  type="password"
                  value={des}
                  onChange={handleChangedes}
                  className="form-control"
                  rows="5"
                  placeholder="Description..."
                />
              </div>

              <div class="form-group justify-content-center align-items-center">
                <button
                  type="submit"
                  // onKeyDown={buttonKeyDown}

                  name="btnSubmit"
                  className="btnContact"
                  value="Sign In"
                  onClick={(e) => {
                    submitData(e);
                  }}
                >
                  Submit
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

export default Post;
