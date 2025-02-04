// importing 3rd party modules
import { validationResult } from "express-validator";
import mongoose from "mongoose";

// importing custom models
import Category from "../models/category.js";

export async function addNewCategory(req, res, next) {
  try {
    const categoryNameInput = req.body.categoryName;

    const { errors } = validationResult(req);

    //   checking for errors in the user input
    if (errors.length > 0) {
      return res.status(422).json({ message: errors[0].msg, statusCode: 422 });
    }

    const categoryExist = await Category.findOne({
      categoryName: categoryNameInput,
    });

    //   checking if the category name exists in the database
    if (categoryExist) {
      return res
        .status(422)
        .json({ message: "Category exist in the database", statusCode: 422 });
    }

    //   creating a new category
    const newCategory = new Category({ categoryName: categoryNameInput });

    //   saving new strategy
    await newCategory.save();

    return res.status(201).json({
      message: `Category '${categoryNameInput}' created successfully`,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllCategories(req, res, next) {
  try {
    //   fetching all categories from the database
    const allCategories = await Category.find();

    return res.status(200).json({
      message: "All categories fetched sucessfully",
      data: allCategories,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.query;
    const categoryNameInput = req.body.categoryName;

    //   checking if id is a valid ObjectID
    if (!mongoose.isValidObjectId(id) || !id) {
      return res.status(422).json({
        message: "Invalid category ID",
        statusCode: 422,
      });
    }

    const { errors } = validationResult(req);

    //   checking for errors in the user input
    if (errors.length > 0) {
      return res.status(422).json({ message: errors[0].msg, statusCode: 422 });
    }

    const categoryExist = await Category.findOne({
      _id: id,
    });

    const oldName = categoryExist.categoryName;

    //   checking if category exists
    if (!categoryExist) {
      return res
        .status(422)
        .json({ message: "Category does not exist", statusCode: 422 });
    }

    categoryExist.categoryName = categoryNameInput;

    await categoryExist.save();

    return res.status(200).json({
      message: `Category '${oldName}' updated to '${categoryExist.categoryName}'`,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.query;

    //   checking if id is a valid ObjectID
    if (!mongoose.isValidObjectId(id) || !id) {
      return res.status(422).json({
        message: "Invalid category ID",
        statusCode: 422,
      });
    }

    const categoryExist = await Category.findById(id);

    //   checking if category exists
    if (!categoryExist) {
      return res
        .status(422)
        .json({ message: "Category does not exist", statusCode: 422 });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Category '${categoryExist.categoryName}' deleted`,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}
