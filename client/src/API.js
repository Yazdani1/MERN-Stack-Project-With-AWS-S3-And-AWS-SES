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

const getallCategory = async () => {
  const response = await axios.get("/api/getall-category");
  return response;
};

const deleteSingleCategory = async (id) => {
  const response = await axios.delete(`/api/category-delete/${id}`);
  return response;
};

const postCategory = async (payload) => {
  const response = await axios.post("/api/categoryceate", payload);
  return response;
};

const getpostByCategory = async (id) => {
  const response = await axios.get("/api/getpostsbycategory/" + id);
  return response;
};

const getSingleCategorytoShowUpdateField = async (id) => {
  const response = await axios.get("/api/getsingle-category/" + id);
  return response;
};

const editCategory = async (id, payload) => {
  const response = await axios.patch("/api/category-edit/" + id, payload);
  return response;
};

/***********/ ////////////////////////////////////**********/
/************************* Post ***********************/
/***********/ ////////////////////////////////////**********/

const createPost = async (payload) => {
  const response = await axios.post("/api/post", payload, headerConfig());
  return response;
};

const getAllpost = async () => {
  const response = await axios.get("/api/getposts", headerConfig());
  return response;
};

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

/***********/ ////////////////////////////////////**********/
/************************* News *******************/
/***********/ ////////////////////////////////////**********/

const createNews = async (payload) => {
  const res = await axios.post("/api/create-news", payload);
  return res;
};


const getAllNews = async ()=>{

  const res = await axios.get("/api/getall-news");
  return res;

}


/***********/ ////////////////////////////////////**********/
/************************* Videos *******************/
/***********/ ////////////////////////////////////**********/


const createVideo = async (payload)=>{

  const res = await axios.post("/api/create-video",payload);
  return res;

}


const getAllVideo = async ()=>{

  const res = await axios.get("/api/get-all-video");
  return res;

}


const deleteVideo = async (id)=>{

  const res = await axios.delete("/api/delete-video/"+id);
  return res;

}





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
  createNews,
  getAllNews,
  createVideo,
  getAllVideo,
  deleteVideo
};
