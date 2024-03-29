const Post = require("../model/Post");
const Category = require("../model/Category");
const Winner = require("../model/Winner");

exports.createPost = (req, res) => {
  const { title, des, categoryBy } = req.body;

  if (!title) {
    return res.status(422).json({ error: "add note title to create post" });
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
    postedBy: req.user
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
    const allpostlist = await Post.find({postedBy: req.user})
      .sort({ date: "DESC" })
      .populate("categoryBy", "_id categoryName date slug")
      .populate("postedBy", "name");


    res.json(allpostlist);
  } catch (err) {
    res.status(400).json({ err: "Something went wrong.. Could not get Post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    var deletequery = { _id: req.params.id };
    const deletedata = await Post.findByIdAndDelete(deletequery);
    res.status(200).json(deletedata);
  } catch (err) {
    res.status(404).json({ err: "Something went wrong..Post Could not found to Delete" });

  }
};



// get post by category

exports.getpostBycategory = async (req, res) => {
  try {
    const categoryInfo = await Category.findOne({ slug: req.params.slug });
    const postsData = await Post.find({ categoryBy: categoryInfo._id }).populate(
      "categoryBy",
      "_id categoryName "
    );

    res.json({ categoryInfo, postsData });
  } catch (err) {
    res.status(404).json({error:"Category Could not found"})
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
  } catch (err) {
    res.status(400).json({ err: "Something went wrong..Post Could not found" });
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

exports.postrandomWinner = async (req, res) => {
  try {
    const getallpost = await Post.find({}).populate(
      "categoryBy",
      "_id categoryName "
    );
    var lottarywinner =
      getallpost[Math.floor(Math.random() * getallpost.length)];

    const winnerdata = new Winner({
      winnername: lottarywinner.des,
    });

    const savewinner = await Winner.create(winnerdata);

    res.json(savewinner);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong cant generate" });
  }
};

exports.getrandomWinner = async (req, res) => {
  try {
    const winnerlist = await Winner.findOne().sort({ date: "DESC" });

    res.json(winnerlist);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong. cant load winner" });
  }
};
