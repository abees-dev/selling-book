import express from "express";
import authControllers from "../controllers/authControllers";
import userControllers from "../controllers/userControllers";
import orderControllers from "../controllers/orderControllers";
import multer from "multer";
import { verifyAdmin, verifyToken } from "../middleware/auth";
import bookControllers from "../controllers/bookControllers";
import { verify } from "jsonwebtoken";
const upload = multer({ storage: multer.diskStorage({}) });
const router = express.Router();
// Auth Router
router.post("/api/auth/register", authControllers.register);
router.post("/api/auth/login", authControllers.login);
router.post("/api/auth/refreshToken", authControllers.refreshToken);
router.post("/api/auth/logout", verifyToken, authControllers.logout);
router.get("/api/auth/current-user", authControllers.getCurrentUser);
// User Router
router.delete(
  "/api/user/delete",
  verifyAdmin,
  upload.single("imageUrl"),
  userControllers.deleteUser
);
router.post(
  "/api/user/create",
  verifyAdmin,
  upload.single("imageUrl"),
  userControllers.createUser
);
router.post(
  "/api/user/update",
  verifyAdmin,
  upload.single("imageUrl"),
  userControllers.updateUser
);
router.get("/api/user/get-user", verifyToken, userControllers.getUser);
router.get("/api/user/getAll", userControllers.getAllUsers);
router.get("/api/user/userId", userControllers.getUserById);

// Books Router

router.get("/api/books/getAll", bookControllers.getAllBooks);
router.get("/api/books/list", bookControllers.getBookByPage);
router.get("/api/books/list-type", bookControllers.getBookByType);
// Create Book
router.post(
  "/api/books/create",
  upload.single("imageUrl"),
  bookControllers.createBook
);
// Update Book
router.post(
  "/api/books/update",
  upload.single("imageUrl"),
  bookControllers.updateBook
);
// Delete Book

router.delete(
  "/api/books/delete",
  upload.single("imageUrl"),
  bookControllers.deleteBook
);

//
router.post("/api/order/createOrder", orderControllers.createOrder);
router.get("/api/order/getOrder", orderControllers.getOrder);

module.exports = router;
