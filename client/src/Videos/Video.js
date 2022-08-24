import React, { useState, useEffect } from "react";
import PageLayout from "../PageLayout";
import CardLayout from "../Components/CardLayout";
import { ToastContainer, toast } from "react-toastify";
const { createVideo, getAllVideo } = require("../API");

const axios = require("axios");

const Video = () => {
  const [title, setTitle] = useState("");
  const [videoButtonName, setVideoButtonName] = useState("");
  const [video, setVideo] = useState("");

  // to progress bar while upload video

  const[progress, setProgress] = useState(0);

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setVideoButtonName(file.name);

      const videoData = new FormData();

      videoData.append("video",file);

      // save progress bar

      const {data} = await axios.post("/api/upload-video",videoData,{

        onUploadProgress: (e)=>{
          setProgress(Math.round((100 * e.loaded) / e.total))
        }

      });
      setVideo(data.Location);

      console.log(data);


    } catch (error) {

      console.log(error)
      toast.error("Video Upload Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const onSubmit = async (e)=>{
    e.preventDefault();


    const res = await createVideo({title,video});

    if(res){


      toast.success("Video Upload Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTitle("");
      setVideo("");

    }

    console.log("Video Post");

  }

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
              </div>

              {progress >0 && <p>Progress..</p>}

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

        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default Video;
