const Post = require("../model/Post");

exports.createPost = (req, res) => {
  const { title, des } = req.body;

  if (!title) {
    return res.status(422).json({ error: "add note title" });
  }

  if (!des) {
    return res.status(422).json({ error: "add note description" });
  }

  const postdata = Post({
    title,
    des,
  });

  Post.create(postdata)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPosts = (req, res) => {
  Post.find({})
    .sort({ date: "DESC" })
  
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePost = (req, res) => {
  var deletequery = { _id: req.params.id };

  Post.findByIdAndDelete(deletequery)
    .then((result) => {
      res.json({ message: "Post deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};
