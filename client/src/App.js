import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import List from "./List";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

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
  useEffect(() => {
    loadallPosts();
  }, []);

  const deletepostbyID = () => {
    let arrlist = [];

    allposts.forEach((id) => {
      if (id.select) {
        arrlist.push(id._id);
      }
    });
    console.log(arrlist)
  };

  return (
    <div>
      <Post totalpost={allposts} />

      {/* <div className="container">
        {allposts.map((item, index) => (
          <div className="card post-items" key={item._id}>
            <div>
              <p className="postinfo">{item.title}</p>
              <p className="postinfo">{item.des}</p>
              <p className="postinfo">{item.date}</p>
            </div>
            <button className="btn-delete" onClick={() => deletePost(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </div> */}

      <div className="container card">
        <button
          className="btn btn-danger"
          onClick={() => {
            deletepostbyID();
          }}
        >
          Delete Post
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    let value = e.target.checked;
                    setPosts(
                      allposts.map((d) => {
                        d.select = value;
                        return d;
                      })
                    );
                  }}
                />
              </th>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {allposts.map((d, index) => (
              <>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={d.select}
                      onChange={(e) => {
                        let value = e.target.checked;
                        setPosts(
                          allposts.map((sd) => {
                            if (sd._id === d._id) {
                              sd.select = value;
                            }
                            return sd;
                          })
                        );
                      }}
                    />
                  </td>
                  <th scope="row">{index + 1}</th>
                  <td>{d.title}</td>
                  <td>{d.des}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default App;
