import React from "react";
import PageLayout from "../PageLayout";
import CardLayout from "../Components/CardLayout";
import { ToastContainer, toast } from "react-toastify";

const Video = () => {
  return (
    <PageLayout>
      <div className="container">
        <CardLayout title="Create Video Post">

          <div className="form-design">
            <form>
              <div className="text-center"></div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vide title.."
                //   value={title}
                //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>

            

              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload Video"
                  accept="image/*"
                />
              
              </div>

              <div class="form-group justify-content-center align-items-center">
                <button
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                //   onClick={(e) => {
                //     onSubmit(e);
                //   }}
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
