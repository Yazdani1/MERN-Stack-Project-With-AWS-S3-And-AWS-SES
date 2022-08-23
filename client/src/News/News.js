import React, { useState } from "react";
import Resizer from "react-image-file-resizer";

import CardLayout from "../Components/CardLayout";
import PageLayout from "../PageLayout";
const axios = require("axios");

const News = () => {
  const [preview, setPreview] = useState("");
  const [image,setImage] = useState("");

  const handleImage = (e) => {
    let file = e.target.files[0];

    setPreview(window.URL.createObjectURL(file));

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {

      try {

        let {data} = await axios.post("/api/upload-image",{image:uri});
        console.log("Image upload",data);



      } catch (error){

        console.log(error);

      }


    });
  
  
  };

  return (
    <PageLayout>
      <div className="container">
        <CardLayout title="Create News">
          <div className="form-design">
            <form>
              <div className="text-center"></div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="news title.."
                />
              </div>

              <div className="form-group">
                <textarea
                  type="text"
                  rows="5"
                  className="form-control"
                  placeholder="news description.."
                />
              </div>

              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload Image"
                  onChange={handleImage}
                  accept="image/*"
                />
                {preview && (
                  <img
                    src={preview}
                    height="50px"
                    width="50px"
                    style={{ borderRadius: "90px", objectFit: "cover" }}
                  />
                )}
              </div>

              <div class="form-group justify-content-center align-items-center">
                <button
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                  //   onClick={(e) => editCategoryInfo(e)}
                >
                  Create News
                </button>
              </div>
            </form>
          </div>
        </CardLayout>
      </div>
    </PageLayout>
  );
};

export default News;
