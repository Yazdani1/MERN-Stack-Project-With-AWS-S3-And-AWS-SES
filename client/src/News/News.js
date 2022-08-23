import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { ToastContainer, toast } from "react-toastify";
import CardLayout from "../Components/CardLayout";
import PageLayout from "../PageLayout";
const { createNews, getAllNews } = require("../API");

const axios = require("axios");

const News = () => {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");

  // to load all the news

  const [newsList, setNewsList] = useState([]);

  const handleImage = (e) => {
    let file = e.target.files[0];

    setPreview(window.URL.createObjectURL(file));

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        const { data } = await axios.post("/api/upload-image", { image: uri });
        console.log("Image upload", data);
        setImage(data.Location);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createNews({ title, des, image });

      console.log(res);

      if (res) {
        toast.success("Post created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTitle("");
        setDes("");
        setImage("");
      }
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getallNews = async () => {
    try {
      const res = await getAllNews();

      setNewsList(res.data);
    } catch (error) {
      console.log(error.response && error.response.data.error);
    }
  };

  useEffect(() => {
    getallNews();
  }, []);

  return (
    <PageLayout>
      <div className="container">
        <CardLayout title="Create News">
          <h1>gdfgdfgdfg{image}</h1>

          <div className="form-design">
            <form>
              <div className="text-center"></div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="news title.."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <textarea
                  type="text"
                  rows="5"
                  className="form-control"
                  placeholder="news description.."
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
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
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  Create News
                </button>
              </div>
            </form>
          </div>
        </CardLayout>

        <div className="row">
          {newsList &&
            newsList.map((item, index) => (
              <div className="card col-xl-4 col-lg-4" key={index}>
                <h5>{item.title}</h5>
                <img src={item.image} />
                <p>{item.des}</p>
              </div>
            ))}
        </div>

        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default News;
