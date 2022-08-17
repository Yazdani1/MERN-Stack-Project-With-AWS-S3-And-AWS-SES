import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory, useParams } from "react-router-dom";
import CardLayout from "../Components/CardLayout";
const { editCategory, getSingleCategorytoShowUpdateField } = require("../API");
const axios = require("axios");


const CategoryComponent = ({ id, categoryName, deleteCategory,loadallCategory }) => {
  // to show and hide edit field

  const [isShowing, setIsShowing] = useState(false);
  const [editname,setUpdatedName] = useState();


  // to edit category

  const editCategoryInfo = async (e) => {
    e.preventDefault();

    try {
      const response = await editCategory(id, { categoryName: editname });
      if(response){
        setIsShowing(false);
        loadallCategory();
      }
    } catch (error) {
      console.log(error.response && error.response.data.err);
    }
  };

  // to show single cate to edit field

  const loadSingleCategory = async()=>{
    try {
        const response = await getSingleCategorytoShowUpdateField(id);
        setUpdatedName(response.data.categoryName);
    } catch(error){
        console.log(error.response && error.response.data.err);
    }
  }


  
  useEffect(()=>{

    loadSingleCategory()

  },[]);

  return (
    <div className="container">
      <div
        style={{
          border: "1px solid black",
          margin: "10px",
          padding: "10px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
        onClick={() => setIsShowing(true)}
      >
        <h5>{categoryName}</h5>

        <button className="btn btn-info">
          <Link to={"/edit-category/" + id} style={{ textDecoration: "none" }}>
            Edit
          </Link>
        </button>

        <button className="btn btn-danger" onClick={() => deleteCategory(id)}>
          Delete
        </button>

       
      </div>
      {isShowing ? (
          <CardLayout title="Update Category Name" cardHeight="200px">
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

                  <button
                    type="submit"
                    name="btnSubmit"
                    className="btn btn-danger"
                    onClick={() => setIsShowing(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </CardLayout>
        ) : null}
    </div>
  );
};

export default CategoryComponent;
