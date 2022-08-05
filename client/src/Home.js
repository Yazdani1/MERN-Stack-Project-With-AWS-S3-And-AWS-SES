import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { Link, useHistory, useParams } from "react-router-dom";
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
    getrandomWinner();
  }, []);

  const [winner, setWinner] = useState("");

  const randomWinner = () => {
    fetch("/api/postrandom-winner", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("From backend" + result.winnername);
      })
      .catch((err) => {});

    // let lottarywinner = allposts[Math.floor(Math.random() * allposts.length)];
    // setWinner(lottarywinner);

    // console.log("Resulkt" + lottarywinner.des);
  };

  const getrandomWinner = () => {
    fetch("/api/getrandom-winner", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("From backend" + result.winnername);
        if (result) {
          setWinner(result);
        }
      })
      .catch((err) => {});

    // let lottarywinner = allposts[Math.floor(Math.random() * allposts.length)];
    // setWinner(lottarywinner);

    // console.log("Resulkt" + lottarywinner.des);
  };

  return (
    <div className="container">
      <div
        className="home_header"
        style={{
          height: "300px",
          backgroundColor: "red",
          borderRadius: "20px",
          border: "1px solid black",
        }}
      >
        <h4>Home Page</h4>
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <ShowCharts allposts={allposts} />

          <div
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

            <h1 style={{ background: "yellow", fontSize: "30px" }}>
              {" "}
              {winner.winnername}
            </h1>
          </div>

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
                {/* <p>{item.date}</p> */}

                <Link
                  to={"/category/" + item.categoryBy?._id}
                  style={{ textDecoration: "none" }}
                >
                  <h6>{item.categoryBy?.categoryName}</h6>
                  {/* <p>{item.categoryBy?.date}</p> */}
                </Link>
                {/* <p className="postinfo">{item.date}</p> */}
              </div>
              <button
                className="btn btn-delete"
                // onMouseEnter={() => deletePost(item._id)}
                onClick={() => deletePost(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="col-xl-4 col-lg-4">
          <div className="category-section" style={{backgroundColor: "orangered",color:"white"}}>
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
                  to={"/category/" + c._id}
                  style={{ textDecoration: "none" }}
                >
                  <h5>{c.categoryName} -</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
