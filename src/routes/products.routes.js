import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
} from "../controllers/products.controller.js";

import { authentication } from "../middlewares/authentication.js";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products/create", authentication, createProduct);

router.delete("/products/:id", authentication, deleteProduct);

export default router;
