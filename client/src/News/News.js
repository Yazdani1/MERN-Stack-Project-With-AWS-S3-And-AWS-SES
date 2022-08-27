import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { ToastContainer, toast } from "react-toastify";
import CardLayout from "../Components/CardLayout";
import PageLayout from "../PageLayout";
const axios = require("axios");

const { createNews, getAllNews, deleteSingleNews } = require("../API");

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
        setPreview("");

        getallNews();
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

  // to delete a single news

  const deleteNews = async (id) => {
    try {
      const res = await deleteSingleNews(id);

      if (res) {
        toast.success("News Deleted Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        getallNews();
      }
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
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
                <label className="form-control">
                  Upload Image
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Upload Image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
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
              <div
                className="card col-xl-4 col-lg-4"
                key={index}
                style={{ margin: "5px" }}
              >
                <h5>{item.title}</h5>
                <img
                  src={item.image}
                  height="300px"
                  style={{ objectFit: "cover" }}
                />
                <p>{item.des}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteNews(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>

        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default News;
