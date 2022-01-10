import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [allposts, setPosts] = useState([]);
  const loadallPosts = () => {
    fetch(`/api/getposts`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if(result){
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
  useEffect(() => {
    loadallPosts();
  }, [allposts]);

  return (
    <div>
      <Post totalpost={allposts}/>

      <div className="container">
        {allposts.map((item, index) => (
          <div className="card post-items" key={item._id}>
            <div>
              <p className="postinfo">{item.title}</p>
              <p className="postinfo">{item.des}</p>
              <p className="postinfo">{item.date}</p>
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
      <ToastContainer autoClose={8000} />

    </div>
  );
};

export default App;
