const axios = require("axios");

const headerConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

/***********/ ////////////////////////////////////**********/
/******         User Authentication              **********/
/***********/ ////////////////////////////////////**********/

const userRegistration = async (payload) => {
  const response = await axios.post(
    "http://localhost:5000/api/registration",
    payload
  );
  return response;
};

// const userLoginDetails = async (payload) => {
//   const response = await axios.post("/api/login", payload);
//   return response;
// };

/***********/ ////////////////////////////////////**********/
/************************* Category ***********************/
/***********/ ////////////////////////////////////**********/

const getallCategory = async () => {
  const response = await axios.get("http://localhost:5000/api/getall-category");
  return response;
};

const deleteSingleCategory = async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/category-delete/${id}`
  );
  return response;
};

const postCategory = async (payload) => {
  const response = await axios.post(
    "http://localhost:5000/api/categoryceate",
    payload
  );
  return response;
};

const getpostByCategory = async (id) => {
  const response = await axios.get(
    "http://localhost:5000/api/getpostsbycategory/" + id
  );
  return response;
};

const getSingleCategorytoShowUpdateField = async (id) => {
  const response = await axios.get(
    "http://localhost:5000/api/getsingle-category/" + id
  );
  return response;
};

const editCategory = async (id, payload) => {
  const response = await axios.patch(
    "http://localhost:5000/api/category-edit/" + id,
    payload
  );
  return response;
};

/***********/ ////////////////////////////////////**********/
/************************* Post ***********************/
/***********/ ////////////////////////////////////**********/

const createPost = async (payload) => {
  const response = await axios.post("http://localhost:5000/api/post", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

const getAllpost = async () => {
  const response = await axios.get("http://localhost:5000/api/getposts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

const deleteSinglePost = async (id) => {
  const response = await axios.delete(
    "http://localhost:5000/api/delete/" + id,
    headerConfig()
  );
  return response;
};

/***********/ ////////////////////////////////////**********/
/************************* Random Winner *******************/
/***********/ ////////////////////////////////////**********/

const getRandomWinner = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/getrandom-winner"
  );
  return response;
};

const postRandomWinner = async () => {
  const response = await axios.post(
    "http://localhost:5000/api/postrandom-winner"
  );
  return response;
};

/***********/ ////////////////////////////////////**********/
/************************* News *******************/
/***********/ ////////////////////////////////////**********/

const createNews = async (payload) => {
  const res = await axios.post(
    "http://localhost:5000/api/create-news",
    payload
  );
  return res;
};

const getAllNews = async () => {
  const res = await axios.get("http://localhost:5000/api/getall-news");
  return res;
};

const deleteSingleNews = async (id) => {
  const res = await axios.delete("http://localhost:5000/api/delete-news/" + id);
  return res;
};

// to delte  multiple news

const deleteMultipleNews = async (payload) => {
  const res = await axios.delete("http://localhost:5000/api/delte-multiple-news",payload);
  return res;
};

/***********/ ////////////////////////////////////**********/
/************************* Videos *******************/
/***********/ ////////////////////////////////////**********/

const createVideo = async (payload) => {
  const res = await axios.post(
    "http://localhost:5000/api/create-video",
    payload
  );
  return res;
};

const getAllVideo = async () => {
  const res = await axios.get("http://localhost:5000/api/get-all-video");
  return res;
};

const deleteVideo = async (id) => {
  const res = await axios.delete(
    "http://localhost:5000/api/delete-video/" + id
  );
  return res;
};

/***********/ ////////////////////////////////////**********/
/************************* PDF File      *******************/
/***********/ ////////////////////////////////////**********/

const createPdfPost = async (payload) => {
  const res = await axios.post(
    "http://localhost:5000/api/create-pdf-Post",
    payload
  );
  return res;
};

const getPdfPost = async () => {
  const res = await axios.get("http://localhost:5000/api/getAllPdf");
  return res;
};

/***********/ ////////////////////////////////////**********/
/************************* Audio File      *******************/
/***********/ ////////////////////////////////////**********/

const createAudioPost = async (payload) => {
  const res = await axios.post(
    "http://localhost:5000/api/create-audio-post",
    payload
  );
  return res;
};

const getAllAudioPost = async () => {
  const res = await axios.get("http://localhost:5000/api/get-all-audiopost");
  return res;
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
  // userLoginDetails,
  createNews,
  getAllNews,
  deleteMultipleNews,
  createVideo,
  getAllVideo,
  deleteVideo,
  deleteSingleNews,
  createPdfPost,
  getPdfPost,
  createAudioPost,
  getAllAudioPost,
};
