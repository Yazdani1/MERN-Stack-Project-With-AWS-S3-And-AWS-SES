import React, { useState, useEffect } from "react";
import PageLayout from "../PageLayout";
import CardLayout from "../Components/CardLayout";
import { ToastContainer, toast } from "react-toastify";
import ReactPlayer from "react-player";
const { createVideo, getAllVideo, deleteVideo } = require("../API");

const axios = require("axios");

const Video = () => {
  const [title, setTitle] = useState("");
  const [videoButtonName, setVideoButtonName] = useState("");
  const [video, setVideo] = useState("");

  const [allVideos, setAllVideos] = useState([]);

  // to progress bar while upload video

  const [progress, setProgress] = useState(0);

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setVideoButtonName(file.name);

      const videoData = new FormData();

      videoData.append("video", file);

      // save progress bar

      const { data } = await axios.post("http://localhost:5000/api/upload-video", videoData, {
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
          console.log(Math.round((100 * e.loaded) / e.total));
        },
      });
      setVideo(data.Location);

      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Video Upload Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createVideo({ title, video_link: video });
      if (res) {
        toast.success("Video Uploaded Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTitle("");
        setVideo("");
        loadVideoPost();

      }
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const loadVideoPost = async () => {
    try {
      const res = await getAllVideo();
      setAllVideos(res.data);
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const deletePostVideo = async (id) => {
    try {
      const res = await deleteVideo(id);

      if (res) {
        toast.success("Video Post Deleted", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadVideoPost();

      }
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadVideoPost();
  }, []);

  return (
    <PageLayout>
      <div className="container">
        <CardLayout title="Create Video Post">
          <h1>Video Link: {video}</h1>
          <div className="form-design">
            <form>
              <div className="text-center"></div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vide title.."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-control">
                  {videoButtonName ? videoButtonName : "Upload Video"}
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleVideo}
                    placeholder="Upload Video"
                    accept="video/*"
                    hidden
                  />
                </label>
                <div className="progress-bar"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{width:`${progress}%`}}
                >

                  {progress}

                </div>
              </div>

              {progress > 0 && <p>Progress..</p>}

              <div class="form-group justify-content-center align-items-center">
                <button
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  Publish Video
                </button>
              </div>
            </form>
          </div>
        </CardLayout>

        <div className="row">
          {allVideos &&
            allVideos.map((v, index) => (
              <div className="col-xl-4 col-lg-4" key={index}>
                <div className="card ">
                  <ReactPlayer
                    loop={true}
                    playing={false}
                    controls
                    height="250px"
                    width="330px"
                    url={v.video_link}
                    previewTabIndex={10}
                  />
                  <h6>{v.title}</h6>

                  <button
                    className="btn btn-danger"
                    onClick={() => deletePostVideo(v._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default Video;
