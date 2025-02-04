// importing 3rd party modules
import express from "express";
import { body } from "express-validator";

// importing custom controllers
import * as adminControllers from "../controllers/admin.js";

// express router app
const router = express.Router();

// routes
// route to add new category
router.put(
  "/new-category",
  [
    body("categoryName")
      .isLength({ min: 1 })
      .withMessage("Category name cannot be empty"),
  ],
  adminControllers.addNewCategory
);

// route to get all categories
router.get("/all-categories", adminControllers.getAllCategories);

// route to update a category
router.post(
  "/category/update",
  [
    body("categoryName")
      .isLength({ min: 1 })
      .withMessage("Category name cannot be empty"),
  ],
  adminControllers.updateCategory
);

// route to delete a category
router.delete("/category/delete", adminControllers.deleteCategory);

export default router;
