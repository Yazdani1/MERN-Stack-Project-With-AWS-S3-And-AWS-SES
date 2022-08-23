const axios = require("axios");

/***********/ ////////////////////////////////////**********/
/******         User Authentication              **********/
/***********/ ////////////////////////////////////**********/

const userRegistration = async (payload) => {
  const response = await axios.post("/api/registration", payload);
  return response;
};

const userLogin = async (payload) => {
  const response = await axios.post("/api/login", payload);
  return response;
};

/***********/ ////////////////////////////////////**********/
/************************* Category ***********************/
/***********/ ////////////////////////////////////**********/

// to load all the category
const getallCategory = async () => {
  const response = await axios.get("/api/getall-category");
  return response;
};

// to delete category

const deleteSingleCategory = async (id) => {
  const response = await axios.delete(`/api/category-delete/${id}`);
  return response;
};

// to post category

const postCategory = async (payload) => {
  const response = await axios.post("/api/categoryceate", payload);
  return response;
};

// to get category post

const getpostByCategory = async (id) => {
  const response = await axios.get("/api/getpostsbycategory/" + id);
  return response;
};

// to get single category to show data into update field

const getSingleCategorytoShowUpdateField = async (id) => {
  const response = await axios.get("/api/getsingle-category/" + id);
  return response;
};

// to edit category

const editCategory = async (id, payload) => {
  const response = await axios.patch("/api/category-edit/" + id, payload);
  return response;
};

/***********/ ////////////////////////////////////**********/
/************************* Post ***********************/
/***********/ ////////////////////////////////////**********/

// to create post

const createPost = async (payload) => {
  const response = await axios.post("/api/post", payload, {
    headers: {
      // "Content-Type": "application/json",
      // Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

// to get all the post

const getAllpost = async () => {
  const response = await axios.get("/api/getposts",{
    headers: {
      // "Content-Type": "application/json",
      // Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

// delete single post

const deleteSinglePost = async (id) => {
  const response = await axios.delete("/api/delete/" + id);
  return response;
};

/***********/ ////////////////////////////////////**********/
/************************* Random Winner *******************/
/***********/ ////////////////////////////////////**********/

const getRandomWinner = async () => {
  const response = await axios.get("/api/getrandom-winner");
  return response;
};

const postRandomWinner = async () => {
  const response = await axios.post("/api/postrandom-winner");
  return response;
};

module.exports = {
  getallCategory,
  deleteSingleCategory,
  postCategory,
  createPost,
  getAllpost,
  deleteSinglePost,
  getRandomWinner,
  postRandomWinner,
  getpostByCategory,
  editCategory,
  getSingleCategorytoShowUpdateField,
  userRegistration,
  userLogin,
};
