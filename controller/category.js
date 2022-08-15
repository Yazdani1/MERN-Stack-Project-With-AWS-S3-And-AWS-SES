const Category = require("../model/Category");
const Post = require("../model/Post");

exports.createCategory = (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(422).json({ error: "Add a category name" });
  }

  const categgoryData = Category({
    categoryName,
  });

  Category.create(categgoryData)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//to get all the category list

exports.getCategory = async (req, res) => {
  try {
    const catecoryList = await Category.find({}).sort({ date: "DESC" });


    let eachcatid = undefined;
    let items = catecoryList._id;


    const catid = catecoryList.map(cat=>cat._id);

    // for(eachcatid of catecoryList){

    //   postcount = await Post.find({categoryBy:eachcatid._id})

    // }

  

    // catecoryList.forEach(function(post){

    //   eachcatid = post.categoryName

    
    // })



    const postcount = await Post.find({categoryBy:catid}).populate("categoryBy", "_id categoryName ");


    res.json({catecoryList, eachcatid,postcount,catid});
  } catch (err) {
    res.status(400).json({ err: "Something went wrong..Category Could not Found" });

  }
};

//to delete category list

exports.deleteCategory = async (req, res) => {
  try {
    const delete_category_query = { _id: req.params.id };
    const category_delete = await Category.findByIdAndDelete(
      delete_category_query
    );
    res.json({success:true});
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
