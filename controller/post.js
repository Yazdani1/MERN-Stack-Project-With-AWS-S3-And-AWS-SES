const Post = require("../model/Post");
const Category = require("../model/Category");

exports.createPost = (req, res) => {
  const { title, des, categoryBy } = req.body;

  if (!title) {
    return res.status(422).json({ error: "add note title" });
  }

  if (!des) {
    return res.status(422).json({ error: "add note description" });
  }
  if (!categoryBy) {
    return res.status(422).json({ error: "add note category" });
  }

  const postdata = Post({
    title,
    des,
    categoryBy,
  });

  Post.create(postdata)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPosts = async (req, res) => {
  try {
    const allpostlist = await Post.find({})
      .sort({ date: "DESC" })
      .populate("categoryBy", "_id categoryName date");

    res.json(allpostlist);
  } catch (err) {
    console.log(err);
  }

  // Post.find({})
  //   .sort({ date: "DESC" })
  //   .populate("categoryBy", "_id categoryName date")
  //   .then((result) => {
  //     res.json(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.deletePost = async (req, res) => {
  try {
    var deletequery = { _id: req.params.id };
    const deletedata = await Post.findByIdAndDelete(deletequery);
  } catch (err) {
    console.log(err);
  }
};

// exports.deletePost = (req, res) => {
//   var deletequery = { _id: req.params.id };

//   Post.findByIdAndDelete(deletequery)
//     .then((result) => {
//       res.json({ message: "Post deleted successfully" });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

//get post by category

exports.getpostBycategory = async (req, res) => {
  try {
    const categoryInfo = await Category.findOne({ _id: req.params.id });
    const postsData = await Post.find({ categoryBy: req.params.id }).populate(
      "categoryBy",
      "_id categoryName "
    );

    res.json({ categoryInfo, postsData });
  } catch (err) {
    console.log(err);
  }
};

// related post by category

exports.getrelatedPostbyCategory = async (req, res) => {
  try {
    const detailsquery = { _id: req.params.id };

    const detailspost = await Post.findOne(detailsquery).populate(
      "categoryBy",
      "_id categoryName "
    );


    const relatedpost = await Post.find({
      _id: { $ne: detailsquery },
      categoryBy: detailspost.categoryBy.id,
    }).populate("categoryBy", "_id categoryName ");

    res.json({ detailspost, relatedpost });
  } catch(err) {
    res.status(400).json({ err: "Something went wrong" });
  }
};

// exports.getpostBycategory = (req, res) => {

//   Category.findOne({ _id: req.params.id })
//     .then((categoryInfo) => {
//       Post.find({ categoryBy: req.params.id })
//         .populate("categoryBy", "_id categoryName ")
//         .exec((err, postsData) => {
//           if (err) {
//             return res.status(422).json({ error: err });
//           }
//           res.json({ categoryInfo, postsData });
//         });
//     })
//     .catch((err) => {
//       return res.status(404).json({ error: err });
//     });

// };
