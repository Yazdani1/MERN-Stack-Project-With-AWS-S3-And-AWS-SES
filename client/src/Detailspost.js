import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

const Detailspost = () => {
  const { id } = useParams();

  const [singlepost, setSinglepost] = useState([]);
  const [error,setError] = useState();

  const loadDetailspost = () => {
    fetch(`/api/details-post/` + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.err) {
            setError(result.err);
        } else {
            setSinglepost(result);
        console.log(result);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadDetailspost();
  }, []);

  return (
    <div className="container">
      <div
        className="details-post"
        style={{
          backgroundColor: "green",
          marginTop: "20px",
          color: "white",
          padding: "20px",
        }}
      >
        <h1>{error}</h1>
        <h1>Title: {singlepost.detailspost?.title}</h1>
        <h4>Des: {singlepost.detailspost?.des}</h4>
        <h5>{singlepost.detailspost?.categoryBy.categoryName}</h5>
      </div>

      <div className="related-posts">
        <h4>Related Post : {singlepost.relatedpost?.length}</h4>
        <div className="row">
          {singlepost.relatedpost &&
            singlepost.relatedpost.map((item, index) => (
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div
                  className="card"
                  style={{
                    marginTop: "20px",
                    color: "black",
                    padding: "20px",
                  }}
                >
                  <h1>{item.title}</h1>
                  <h4>{item.des}</h4>
                  <h5>{item.categoryBy?.categoryName}</h5>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Detailspost;
