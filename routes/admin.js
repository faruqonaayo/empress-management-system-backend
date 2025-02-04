// importing 3rd party modules
import express from "express";
import { body } from "express-validator";
import multer from "multer";

// importing custom controllers
import * as adminControllers from "../controllers/admin.js";

// express router app
const router = express.Router();

//
// customizing the storage location
const storage = multer.diskStorage({
  destination: "public/uploads/categories",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const uploads = multer({ storage: storage, fileFilter: fileFilter });

// routes
// route to add new category
router.put(
  "/new-category",
  uploads.single("categoryImage"),
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
