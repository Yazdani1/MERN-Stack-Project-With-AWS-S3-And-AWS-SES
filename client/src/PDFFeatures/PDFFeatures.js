import React, { useState, useEffect } from "react";
import PageLayout from "../PageLayout";
import CardLayout from "../Components/CardLayout";
import { ToastContainer, toast } from "react-toastify";
const { createPdfPost, getPdfPost } = require("../API");

const axios = require("axios");

const PDFFeatures = () => {
  const [title, setTitle] = useState("");
  const [pdfButtonName, setPdfButtonName] = useState("");
  const [pdfFile, setPdfFile] = useState("");

  const [loading, setLoading] = useState(false);
  // to load all the pdf
  const [allPdfPosts, setAllPdfPosts] = useState([]);
  const handlePdfUpload = async (e) => {
    setLoading(true);

    try {
      const file = e.target.files[0];
      setPdfButtonName(file.name);

      const pdfData = new FormData();

      pdfData.append("pdffile", file);

      // save progress bar

      const { data } = await axios.post(
        "http://localhost:5000/api/uploadpdf",
        pdfData
      );
      setPdfFile(data.Location);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("PDF Upload Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };
  const onSubmitPdfPost = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: title,
        pdffile: pdfFile,
      };

      const res = await createPdfPost(payload);

      if (res) {
        toast.success("Post created successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTitle("");
        setPdfFile("");
        setPdfButtonName("");
      }
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  // load all pdf psots
  const loadAllpdf = async () => {
    try {
      const res = await getPdfPost();
      setAllPdfPosts(res.data);
    } catch (error) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllpdf();
  }, []);

  return (
    <PageLayout>
      <div className="container">
        <CardLayout title="Create Video Post">
          <h1>PDF File Link: {pdfFile}</h1>
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
                  {pdfButtonName ? pdfButtonName : "Upload PDF File"}
                  <input
                    type="file"
                    className="form-control"
                    onChange={handlePdfUpload}
                    placeholder="Upload PDF"
                    accept=".pdf,.doc"
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
                    onSubmitPdfPost(e);
                  }}
                >
                  {loading? "Uploading..":"Publish PDF"}
                </button>
              </div>
            </form>
          </div>
        </CardLayout>
          <div className="row">
            {allPdfPosts &&
              allPdfPosts.map((item, index) => (
                <div className="col-xl-4 col-lg-4">
                  <div className="card" style={{ marginTop: "15px",padding:"15px" }}>
                    <h1>{item.title}</h1>
                    <a href={item.pdffile} download target="_blank">View PDF</a>
                  </div>
                </div>
              ))}
          </div>
        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default PDFFeatures;
