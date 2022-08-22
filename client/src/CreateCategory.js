import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardLayout from "./Components/CardLayout";
import { Link, useHistory, useParams } from "react-router-dom";
import CategoryComponent from "./Components/CategoryComponent";
import PageLayout from "./PageLayout";

const axios = require("axios");
const {
  getallCategory,
  deleteSingleCategory,
  postCategory,
  editCategory,
} = require("./API");

const CreateCategory = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [categoryName, setCatagoryName] = useState("");
  const [allcategory, setAllcategory] = useState([]);

  // to show and hide edit field

  const [isShowing, setIsShowing] = useState(-1);

  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }

    console.log(selected);

    setSelected(i);
  };

  // to show edit data to input field

  const [editName, setEditName] = useState("");

  const handleChange = (e) => {
    setError("");
    setCatagoryName(e.target.value);
  };

  const submitData = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    try {
      const payload = { categoryName };
      const response = await postCategory(payload);

      // const response = await axios.post("/api/categoryceate", payload);

      if (response) {
        toast.success("Category created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setError("");
        setSuccess(true);
        setCatagoryName("");
        loadallCategory();
      }
    } catch (error) {
      setError(error.response && error.response.data.error);
    }
  };

  // const submitData = (e) => {
  //   e.preventDefault();

  //   setError("");
  //   setSuccess(false);

  //   fetch("/api/categoryceate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({ categoryName }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result.error) {
  //         setError(result.error);
  //         console.log(result.error);
  //       } else {
  //         setError("");
  //         setSuccess(true);
  //         setCatagoryName("");
  //         loadallCategory();

  //         toast.success("Category created Successfully!", {
  //           position: toast.POSITION.TOP_RIGHT,
  //         });
  //       }
  //     });
  // };

  const loadallCategory = async () => {
    try {
      const response = await getallCategory();
      setAllcategory(response.data);
      setEditName(response.data.categoryName);
    } catch (error) {
      setError(error.response && error.response.data.err);
    }
  };

  // to get category list using axios http

  // const loadallCategory = async () => {
  //   try {
  //     const response = await axios.get("/api/getall-category");
  //     setAllcategory(response.data);
  //   } catch (error) {
  //     setError(error.response && error.response.data.err);
  //   }
  // };

  // const loadallCategory = () => {

  //   fetch(`/api/getall-category`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result) {
  //         setAllcategory(result);
  //         console.log(result);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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

  // to edit category

  const deleteCategory = async (id) => {
    try {
      const response = await deleteSingleCategory(id);

      if (response) {
        toast.info("Post Deleted Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadallCategory();
      }
    } catch (error) {
      setError(error.response && error.response.data.err);
    }
  };

  // to delete using axios

  // const deleteCategory = async (id) => {
  //   try {
  //     const response = await axios.delete("/api/category-delete/" + id);

  //     if (response) {
  //       toast.info("Post Deleted Successfully!", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //       loadallCategory();
  //     }
  //   } catch (error) {
  //     setError(error.response && error.response.data.err);
  //   }
  // };

  useEffect(() => {
    loadallCategory();
  }, []);

  const lotarydata = [
    {
      id: 1,
      name: "Jonson",
    },
    {
      id: 2,
      name: "David",
    },
    {
      id: 3,
      name: "Kery",
    },
    {
      id: 4,
      name: "Alexandar",
    },
    {
      id: 5,
      name: "Muller",
    },
    {
      id: 6,
      name: "Clark",
    },
  ];

  var lottarywinner = lotarydata[Math.floor(Math.random() * lotarydata.length)];

  return (
    <PageLayout>
      <div className="container">
        <div
          className="category-header"
          style={{
            height: "300px",
            backgroundColor: "orangered",
            color: "white",
          }}
        >
          <h1>Category Page</h1>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <CardLayout title="Category">
              <div className="form-design">
                <form>
                  <div className="text-center">
                    {/* <h5 className="text-center">Notebook app</h5>
                  <h5 className="text-center">Create Category</h5> */}
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
            </CardLayout>
            {allcategory.catecoryList?.map((c, index) => (
              <CategoryComponent
                loadallCategory={loadallCategory}
                categoryName={c.categoryName}
                id={c._id}
                deleteCategory={deleteCategory}
                key={index}
              />
            ))}
          </div>
        </div>

        {/* <div
        style={{
          backgroundColor: "red",
          color: "white",
          height: "250px",
          border: "1px solid black",
        }}
      >
        <h1>Lottery Winner</h1>

        <h1>Name: {lottarywinner.name}</h1>
      </div> */}

        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default CreateCategory;
