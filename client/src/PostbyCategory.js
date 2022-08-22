import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import PageLayout from "./PageLayout";
const { getpostByCategory } = require("./API");

const PostbyCategory = () => {
  const { id } = useParams();

  const [categoryPost, setCategoryPost] = useState([]);

  const loadpostByCategory = async () => {
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
    loadpostByCategory();
  }, []);

  return (
    <PageLayout>
      <div className="container">
        {categoryPost?.postsData?.length <= 1 && "No posts"}
        <h5
          style={{
            marginTop: "60px",
            backgroundColor: "red",
            color: "white",
            padding: "20px",
          }}
        >
          {categoryPost?.categoryInfo?.categoryName} Total posts:{" "}
          {categoryPost?.postsData?.length}
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
    </PageLayout>
  );
};

export default PostbyCategory;
