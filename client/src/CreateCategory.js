import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCategory = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [categoryName, setCatagoryName] = useState("");
  const [allcategory, setAllcategory] = useState([]);

  const handleChange = (e) => {
    setError("");
    setCatagoryName(e.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    fetch("/api/categoryceate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ categoryName }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
          console.log(result.error);
        } else {
          setError("");
          setSuccess(true);
          setCatagoryName("");

          toast.success("Category created Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

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

  const deleteCategory = (id) => {
    fetch("/api/category-delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(result > {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadallCategory();
  }, []);

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
                  value={categoryName}
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

          {allcategory.catecoryList?.map((c, index) => (
            <div
              style={{
                border: "1px solid black",
                margin: "10px",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <h5>{c.categoryName}</h5>
              <button
                className="btn btn-danger"
                onClick={deleteCategory(c._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default CreateCategory;
