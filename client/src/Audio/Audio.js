import React from "react";
import PageLayout from "../PageLayout";

const Audio = () => {
  return (
    <PageLayout>
     <div className="container">
        {/* <CardLayout title="Create Video Post">
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
                  Publish Audio
                </button>
              </div>
            </form>
          </div>
        </CardLayout>

    
        <ToastContainer autoClose={8000} /> */}
      </div>
    </PageLayout>
  );
};

export default Audio;
