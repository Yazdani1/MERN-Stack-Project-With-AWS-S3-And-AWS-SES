import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
const PostbyCategory = () => {
  const { id } = useParams();

  const [categoryPost, setCategoryPost] = useState([]);

  const loadpostByCategory = () => {
    fetch(`/api/getpostsbycategory/` + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setCategoryPost(result);
          console.log(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadpostByCategory();
  }, []);

  return (
    <div className="container">
      {categoryPost?.postsData?.length <= 1 && "No posts"}
      <h5 style={{ marginTop: "60px", backgroundColor: "red",color:"white",padding:"20px" }}>
        {categoryPost?.categoryInfo?.categoryName}
      </h5>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          {categoryPost?.postsData?.map((item, index) => (
            <div className="card post-items" key={item._id}>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostbyCategory;
