const axios = require('axios');



// Category

// to load all the category
const getallCategory = async()=>{
    const response = await axios.get("/api/getall-category");
    return response;
}

const deleteSingleCategory = async(id)=>{
    const response = await axios.delete(`/api/category-delete/${id}`);
    return response;
}

const postCategory = async(payload)=>{
    const response = await axios.post("/api/categoryceate",payload);
    return response;
}


module.exports = {
    getallCategory,
    deleteSingleCategory,
    postCategory
}



