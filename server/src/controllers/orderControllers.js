import Order from "../models/Order";
import mongoose from "mongoose";

class orderControllers {
  async createOrder(req, res) {
    const { users, books, total } = req.body;
    if (!users || !books)
      return res
        .status(404)
        .json({ success: false, message: "missing the parameter" });
    const newOrder = new Order({
      _id: new mongoose.Types.ObjectId(),
      users,
      books,
      total,
    });
    await newOrder.save();
    return res.status(200).json({
      newOrder,
    });
  }
  async getOrder(req, res) {
    // const id = req.query.id;
    try {
      const order = await Order.find()
        .populate({
          path: "users",
        })
        .populate("books");
      console.log(order);
      return res.status(200).json({ order });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}

module.exports = new orderControllers();
