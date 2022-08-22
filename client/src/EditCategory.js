import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardLayout from "./Components/CardLayout";
import PageLayout from "./PageLayout";
const axios = require("axios");

const { editCategory, getSingleCategorytoShowUpdateField } = require("./API");
const EditCategory = () => {
  const { id } = useParams();

  // const history = useHistory();

  const [editname, setUpdatedName] = useState();

  // to load single category

  const loadSingleCategory = async () => {
    try {
      const response = await getSingleCategorytoShowUpdateField(id);
      setUpdatedName(response.data.categoryName);
    } catch (error) {
      console.log(error.response && error.response.data.err);
    }
  };

  const editCategoryInfo = async (e) => {
    e.preventDefault();

    try {
      const response = await editCategory(id, { categoryName: editname });

      if (response) {
        // history.push("/create-category");
      }
    } catch (error) {
      console.log(error.response && error.response.data.err);
    }
  };

  useEffect(() => {
    editCategoryInfo();
    loadSingleCategory();
  }, []);

  return (
    <PageLayout>
      <div className="container">
        <CardLayout title="Category">
          <div className="form-design">
            <form>
              <div className="text-center"></div>
              <div className="form-group">
                <input
                  type="text"
                  value={editname}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="form-control"
                  placeholder="Add new category name.."
                />
              </div>

              <div class="form-group justify-content-center align-items-center">
                <button
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                  onClick={(e) => editCategoryInfo(e)}
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </CardLayout>
      </div>
    </PageLayout>
  );
};

export default EditCategory;
