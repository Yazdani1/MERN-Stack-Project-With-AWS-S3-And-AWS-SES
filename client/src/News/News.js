import React from "react";
import CardLayout from "../Components/CardLayout";
import PageLayout from "../PageLayout";

const News = () => {
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="news description.."
                />
              </div>

              <div class="form-group justify-content-center align-items-center">
                <button
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                //   onClick={(e) => editCategoryInfo(e)}
                >
                  Update Category
                </button>

                <button
                  type="submit"
                  name="btnSubmit"
                  className="btn btn-danger"
                //   onClick={() => setIsShowing(false)}
                >
                  Close
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
