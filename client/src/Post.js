import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardLayout from "./Components/CardLayout";

const Post = ({ totalpost }) => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [choseCategory, setChooseCategory] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [allcategory, setAllcategory] = useState([]);

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
      body: JSON.stringify({ title, des, categoryBy: choseCategory }),
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
          setChooseCategory("");
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
      Your Note has been posted Successfully!
    </div>
  );

  const loadallCategory = () => {
    fetch(`/api/getall-category`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setAllcategory(result);
          console.log(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadallCategory();
  }, []);

  return (
    <div className="container">
      <CardLayout title="Create new post">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="form-design ">
              <form>
                <div className="text-center">
                  {showError()}
                  {showSuccess()}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Income..."
                  />
                </div>

                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Select Category
                  </label>
                  <select
                    className="custom-select"
                    value={choseCategory}
                    onChange={(e) => setChooseCategory(e.target.value)}
                  >
                    {allcategory.catecoryList?.map((c, index) => (
                      <option key={index} value={c._id}>
                        {c.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <textarea
                    value={des}
                    onChange={handleChangedes}
                    className="form-control"
                    rows="5"
                    placeholder="Expense..."
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
      </CardLayout>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default Post;
