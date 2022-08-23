import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { Link, useHistory, useParams } from "react-router-dom";
import { ShowCharts } from "./charts/ShowCharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLayout from "./PageLayout";

const axios = require("axios");

const {
  getallCategory,
  getRandomWinner,
  getAllpost,
  deleteSinglePost,
  postRandomWinner,
  getpostByCategory,
} = require("./API");

const Home = () => {
  const [allposts, setPosts] = useState([]);
  const [allcategory, setAllcategory] = useState([]);
  const [categoryPost, setCategoryPost] = useState([]);

  console.log("To test" + categoryPost);

  const loadallPosts = async () => {
    try {
      const response = await getAllpost();
      setPosts(response.data);
    } catch (error) {
      console.log(error.response && error.response.data.error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await deleteSinglePost(id);

      if (response) {
        toast.info("Post Deleted Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadallPosts();
        loadallCategory();
      }
    } catch (error) {
      console.log(error.response && error.response.data.error);
    }
  };

  const loadallCategory = async () => {
    try {
      const response = await getallCategory();
      setAllcategory(response.data);
    } catch (error) {
      console.log(error.response && error.response.data.error);
    }
  };

  // to load post by category

  const loadpostByCategory = async (id) => {
    try {
      const response = await getpostByCategory(id);

      if (response) {
        setCategoryPost(response.data);
      }
    } catch (error) {
      console.log(error.response && error.response.data.error);
    }
  };

  useEffect(() => {
    loadallPosts();
    loadallCategory();
    getrandomWinner();
    loadpostByCategory();
  }, []);

  const [winner, setWinner] = useState("");

  const randomWinner = async () => {
    try {
      const response = await postRandomWinner();

      if (response) {
        getrandomWinner();
      }
    } catch (error) {
      console.log(error);
      console.log(error.response && error.response.data.error);
    }
  };

  const getrandomWinner = async () => {
    try {
      const response = await getRandomWinner();
      setWinner(response.data);
    } catch (error) {
      console.log(error.response && error.response.data.error);
    }
  };

  return (
    <PageLayout>
      <div className="container">
        <div
          className="home_header"
          style={{
            height: "100px",
            backgroundColor: "red",
            borderRadius: "10px",
            border: "1px solid black",
            marginTop: "30px",
          }}
        >
          <h4>Home Page</h4>
          {categoryPost ? "Category" : "Normal post"}
        </div>

        <div className="row">
          <div className="col-xl-8 col-lg-8">
            {/* <ShowCharts allposts={allposts} /> */}

            {/* to show random winner result */}

            {/* <div
            style={{
              backgroundColor: "orangered",
              height: "250px",
              color: "white",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <h2>Random Winner Selected</h2>

            <button className="btn btn-info" onClick={() => randomWinner()}>
              Winner Genereate
            </button>

            <h1 style={{ background: "orange", fontSize: "30px",marginTop:"30px" }}>
              {" "}
              {winner.winnername}
            </h1>
          </div> */}

            {allposts.map((item, index) => (
              <div className="card post-items" key={item._id}>
                <div>
                  <Link
                    to={"/details-post/" + item._id}
                    style={{ textDecoration: "none" }}
                  >
                    <p className="postinfo">Income: {item.title}</p>
                  </Link>

                  <p className="postinfo">Expense: {item.des}</p>
                  <h1>{item.postedBy?.name}</h1>

                  <Link
                    to={"/category/" + item.categoryBy?.slug}
                    style={{ textDecoration: "none" }}
                  >
                    <h6>{item.categoryBy?.categoryName}</h6>
                  </Link>
                </div>
                <button
                  className="btn btn-delete"
                  onClick={() => deletePost(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}

            {categoryPost?.postsData?.map((item, index) => (
              <>
                <div className="card post-items" key={item._id}>
                  <h1>Posts By Category</h1>
                  <div>
                    <p className="postinfo">Income: {item.title}</p>
                    <p className="postinfo">Expense: {item.des}</p>

                    <Link
                      to={"/category/" + item.categoryBy?._id}
                      style={{ textDecoration: "none" }}
                    >
                      <h6>{item.categoryBy?.categoryName}</h6>
                    </Link>
                    {/* <p className="postinfo">{item.date}</p> */}
                  </div>
                  {/* <button
                className="btn-delete"
                onClick={() => deletePost(item._id)}
              >
                Delete
              </button> */}
                </div>
              </>
            ))}
          </div>
          <div className="col-xl-4 col-lg-4">
            <div
              className="category-section"
              style={{
                backgroundColor: "orangered",
                color: "white",
                margin: "10px",
                padding: "20px",
              }}
            >
              {allcategory.catecoryList?.map((c, index) => (
                <div
                  style={{
                    border: "1px solid yellow",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Link
                    to={"/category/" + c.slug}
                    style={{ textDecoration: "none", color: "White" }}
                  >
                    <h5>{c.categoryName} </h5>
                  </Link>
                </div>
              ))}
            </div>

            <div
              className="category-section"
              style={{
                backgroundColor: "Black",
                color: "white",
                margin: "10px",
                padding: "20px",
              }}
            >
              {allcategory.catecoryList?.map((c, index) => (
                <div
                  style={{
                    border: "1px solid yellow",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <h5 onClick={() => loadpostByCategory(c.slug)}>
                    {c.categoryName}{" "}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default Home;
