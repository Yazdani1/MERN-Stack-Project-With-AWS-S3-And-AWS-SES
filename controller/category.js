const Category = require("../model/Category");

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
    res.json(catecoryList);


  } catch (err) {
    console.log(err);
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
