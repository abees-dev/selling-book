import mongoose from "mongoose";
import Books from "../models/Books";
import cloudinary from "../utils/cloudinary";

class bookController {
  async getAllBooks(req, res) {
    try {
      const books = await Books.find().sort({ updatedAt: -1 });
      return res.status(200).json({ success: true, books });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "internal server error",
        error: error,
      });
    }
  }
  async getBookByPage(req, res) {
    let { pages, limit, search, type } = req.query;
    if (!pages) pages = 1;
    if (!limit) limit = 6;
    try {
      if (search) {
        const books = await Books.find({
          title: { $regex: search, $options: "gi" },
        })
          .limit(limit)
          .sort({ updatedAt: -1 });

        return res.status(200).json({
          success: true,
          books,
        });
      }
      if (type && type !== "all") {
        const books = await Books.find({
          booksType: { $regex: type, $options: "gi" },
        })
          .limit(limit)
          .sort({ updatedAt: -1 });

        return res.status(200).json({
          success: true,
          books,
        });
      }
      if (type === "all" || !type) {
        const books = await Books.paginate({}, { page: pages, limit });
        const { docs, page, prevPage, nextPage, totalPages } = books;
        return res.status(200).json({
          success: true,
          books: docs,
          paginate: {
            page,
            prevPage,
            nextPage,
            totalPages,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
        error: error,
      });
    }
  }

  async getBookByType(req, res) {}

  async deleteBook(req, res) {
    try {
      const id = req.query.id;

      if (!id)
        return res
          .status(410)
          .json({ success: false, message: "Book is not exists" });
      if (!mongoose.isValidObjectId(id))
        return res
          .status(404)
          .json({ success: false, message: "Book is not valid" });

      await cloudinary.uploader.destroy(`products/books/${id}`);

      await Books.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: "Book deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }

  async createBook(req, res) {
    try {
      const {
        title,
        author,
        price,
        subtitle,
        description,
        booksType,
        imageUrl,
      } = req.body;

      const id = mongoose.Types.ObjectId();

      if (!title)
        return res
          .status(404)
          .json({ success: false, message: "Title is required" });

      let upload = null;

      if (req?.file?.path) {
        upload = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: "books",
          overwrite: true,
          public_id: id,
        });
      }

      const book = new Books({
        _id: id,
        subtitle: subtitle,
        title: title,
        author: author,
        price: price,
        booksType: booksType,
        description: description,
        imageUrl: upload?.secure_url,
      });

      await book.save();

      return res
        .status(200)
        .json({ success: true, message: "Book created", book });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "internal error server",
        error: error,
      });
    }
  }

  async updateBook(req, res) {
    try {
      const id = req.query.id;
      const {
        title,
        subtitle,
        author,
        price,
        description,
        booksType,
        imageUrl,
      } = req.body;
      let upload = null;
      if (!id)
        return res
          .status(410)
          .json({ success: false, message: "User is not exists" });
      if (!mongoose.isValidObjectId(id))
        return res
          .status(404)
          .json({ success: false, message: "User is not valid" });
      if (req?.file?.path) {
        upload = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: "books",
          overwrite: true,
          public_id: id,
        });
      }
      const book = await Books.findOneAndUpdate(
        { _id: id },
        {
          title,
          subtitle,
          author,
          price,
          description,
          booksType,
          imageUrl: upload?.secure_url,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Updated successfully", book });
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ success: false, message: "internal error server" });
    }
  }
}

module.exports = new bookController();
