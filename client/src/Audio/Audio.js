import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import PageLayout from "../PageLayout";
import CardLayout from "../Components/CardLayout";
import { ToastContainer, toast } from "react-toastify";
import "./Audio.css";
const { createAudioPost, getAllAudioPost } = require("../API");


const axios = require("axios");

const Audio = () => {
  const [title, setTitle] = useState("");
  const [audioButtonName, setAudioPdfButtonName] = useState("");
  const [audioFile, setAudioFile] = useState("");

  const [loading, setLoading] = useState(false);

  // to load all the pdf

  const [allAudioPosts, setAllAudioPosts] = useState([]);

  const handleAudioUpload = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      setAudioPdfButtonName(file.name);

      const audioData = new FormData();

      audioData.append("audio", file);

      // save progress bar

      const { data } = await axios.post(
        "http://localhost:5000/api/upload-audio",
        audioData
      );

      if (data) {
        console.log(data);
        setAudioFile(data.Location);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Audio Upload Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  // to create audio post

  const onSubmitAudioFile = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: title,
        audiofile: audioFile,
      };

      const res = await createAudioPost(payload);

      if (res) {
        toast.success("Post created successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTitle("");
        setAudioPdfButtonName("");
        setAudioFile("");
        loadAllAudioPost();
      }
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // to load all audio posts

  const loadAllAudioPost = async () => {
    try {
      const res = await getAllAudioPost();

      console.log(res.data);

      setAllAudioPosts(res.data);
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllAudioPost();
  }, []);

  return (
    <PageLayout>
      <div className="container audio-design">
        <CardLayout title="Create Audio Post">
          <div className="form-design">
            <form>
              <h1>Audio File:{audioFile}</h1>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Audio name.."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-control">
                  {audioButtonName ? audioButtonName : "Upload Audio wav"}
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleAudioUpload}
                    placeholder="Upload Audio"
                    accept="audio/*"
                    hidden
                  />
                </label>
              </div>

              <div class="form-group justify-content-center align-items-center">
                <button
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                  onClick={(e) => {
                    onSubmitAudioFile(e);
                  }}
                >
                  {loading ? "Uploading.." : "Publish Audio"}
                </button>
              </div>
            </form>
          </div>
        </CardLayout>

        <div className="row">
          {allAudioPosts &&
            allAudioPosts.map((item, index) => (
              <div className="col-xl-4 col-lg-4">
                <div
                  className="card"
                  style={{ margin: "10px", padding: "15px" }}
                >
                  <h6>{item.title}</h6>
                  <ReactAudioPlayer
                    src={item.audiofile}
                    controls
                    style={{ color: "red" }}
                  />
                </div>
              </div>
            ))}
        </div>

        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default Audio;


{/* <audio controls>
<source
  src="https://news-note.s3.amazonaws.com/a4ff2a92-da1b-473c-ad1f-d6fec0339f48.wav"
  type="audio/mpeg"
/>
</audio> */}

