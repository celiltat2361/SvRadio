const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const getAllCategories = async ( req, res ) => {
  let categories = await fetch(
    `https://api.sr.se/v2/programcategories?${json}&${paginationFalse}`
  );
  categories = await categories.json();
  res.json(categories); 
};

const getCategoryById = async ( req, res) => {
  let category = await fetch(`http://api.sr.se/api/v2/programcategories/${req.params.categoryId}?${json}`);
  category = await category.json();
  res.json(category.programcategory)
}



const getProgramsWithCategory = async ( req, res) => {
  let categoryOfPrograms = await fetch(
    `https://api.sr.se/api/v2/programs/index?${json}&${paginationFalse}&programcategoryid=${req.params.categoryId}`
  );
  categoryOfPrograms = await categoryOfPrograms.json();
  res.json(categoryOfPrograms.programs);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getProgramsWithCategory
};
