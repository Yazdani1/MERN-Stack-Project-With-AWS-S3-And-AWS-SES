const Category = require("../model/Category");
const Post = require("../model/Post");
var slugify = require('slugify');

exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const slug = slugify(categoryName);


    if (!categoryName) {
      return res
        .status(422)
        .json({ error: "Add a category name.................." });
    }

    const categgoryData = Category({
      categoryName,slug
    });
    const create_category = await Category.create(categgoryData);
    res.status(201).json(create_category);
  } catch (error) {
    return res.status(400).json({ error: "Could not create a category" });
  }

};

//to get all the category list

exports.getCategory = async (req, res) => {
  try {
    const catecoryList = await Category.find({}).sort({ date: "DESC" });

    let eachcatid = undefined;
    let items = catecoryList._id;

    const catid = catecoryList.map((cat) => cat._id);

    // for(eachcatid of catecoryList){

    //   postcount = await Post.find({categoryBy:eachcatid._id})

    // }

    // catecoryList.forEach(function(post){

    //   eachcatid = post.categoryName

    // })

    const postcount = await Post.find({ categoryBy: catid }).populate(
      "categoryBy",
      "_id categoryName "
    );

    res.json({ catecoryList, eachcatid, postcount, catid });
  } catch (err) {
    res
      .status(400)
      .json({ err: "Something went wrong..Category Could not Found" });
  }
};

// to get single category to update

exports.getSingleCategory = async(req,res)=>{

  try {
    const single_category_query = { _id: req.params.id };
    const sinlgecategory = await Category.findOne(single_category_query);
    res.status(200).json(sinlgecategory);
  } catch (err) {
    res.status(404).json({ err: "Something went wrong.Could find category" });
  }
}


// to update category name

exports.editCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const slug = slugify(categoryName);


    const edit_query = { _id: req.params.id };

    const editcategory = await Category.findByIdAndUpdate(edit_query, {
      $set: { categoryName,slug },
    });

    res.status(200).json(editcategory);
  } catch (error) {
    return res.status(404).json({ error: "Category could not found to edit" });
  }
};

//to delete category list

exports.deleteCategory = async (req, res) => {
  try {
    const delete_category_query = { _id: req.params.id };
    const category_delete = await Category.findByIdAndDelete(
      delete_category_query
    );
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ err: "Something went wrong.Could not Delete" });
  }
};

// exports.getCategory = (req, res) => {
//   Category.find({})
//     .sort({ date: "DESC" })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
