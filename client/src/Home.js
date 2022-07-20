import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";

import { ShowCharts } from "./charts/ShowCharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [allposts, setPosts] = useState([]);
  const [allcategory, setAllcategory] = useState([]);

  const loadallPosts = () => {
    fetch(`/api/getposts`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setPosts(result);
          console.log(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = (id) => {
    fetch("/api/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          console.log("post deleted success");
          toast.info("Post Deleted Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          loadallPosts();
        }
      })
      .catch((err) => {
        console.log(err);
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

  useEffect(() => {
    loadallPosts();
    loadallCategory();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <ShowCharts allposts={allposts} />
          {allposts.map((item, index) => (
            <div className="card post-items" key={item._id}>
              <div>
                <p className="postinfo">Income: {item.title}</p>
                <p className="postinfo">Expense: {item.des}</p>
                <h6>{item.categoryBy?.categoryName}</h6>
                {/* <p className="postinfo">{item.date}</p> */}
              </div>
              <button
                className="btn-delete"
                onClick={() => deletePost(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="col-xl-4 col-lg-4">
          {allcategory.map((c, index) => (
            <div
              style={{
                border: "1px solid black",
                margin: "10px",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <h5>{c.categoryName}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
