import User from "../models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/accessToken";
class authController {
  async register(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = await User.find({ email: email });
      if (user.length > 0)
        return res
          .status(400)
          .json({ success: false, message: "email is not exist" });

      if (!email)
        return res
          .status(404)
          .json({ success: false, message: "email is not valid" });
      if (!password)
        return res
          .status(404)
          .json({ success: false, message: "password is not valid" });
      const passwordHash = bcrypt.hashSync(password, 10);
      const newUser = User({
        id: new mongoose.Types.ObjectId(),
        fullName: `${firstName} ${lastName}`,
        email: email,
        password: passwordHash,
      });
      const accessToken = generateAccessToken(newUser);
      await newUser.save();

      return res.status(200).json({
        success: true,
        message: "ok",
        accessToken,
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "internal error server",
        error: error,
      });
    }
  }
  //

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email)
        return res.status(404).json({
          success: false,
          message: "Missing username and password",
        });
      if (!password)
        return res.status(404).json({
          success: false,
          message: "Missing username and password",
        });
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User or password does not exist",
        });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(404).json({
          success: false,
          message: "User or password does not exist",
        });
      }

      if (user && validPassword) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        // await User.updateMany({ id: user._id }, { refreshToken: refreshToken });
        // Add refresh token
        // res.cookie('refreshToken', refreshToken, {
        // 	// htmlOnly: true,
        // 	// secure: false,
        // 	// sameSite: 'strict',
        // });

        const { password, ...other } = user._doc;
        return res.status(200).json({
          success: true,
          message: "ok",
          user: { ...other },
          accessToken,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "internal error server",
        error: error,
      });
    }
  }

  async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
      return res
        .status(404)
        .json({ success: false, message: "You are not authenticated" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res
            .status(404)
            .json({ success: false, message: "token is invalid" });
        }
        const user = await User.findOne({ _id: decoded.id });

        if (user.refreshToken !== refreshToken) {
          return res.status(400).json({
            success: false,
            message: "Refresh token is invalid",
          });
        }
        const newAccessToken = generateAccessToken(decoded);
        const newRefreshToken = generateRefreshToken(decoded);
        await User.updateMany(
          { _id: user._id },
          { refreshToken: newRefreshToken }
        );

        res.cookie("refreshToken", newRefreshToken, {
          htmlOnly: true,
          secure: false,
          sameSite: "strict",
        });
        return res.status(200).json({
          success: true,
          message: "refresh token successfully",
          accessToken: newAccessToken,
        });
      }
    );
  }
  async getCurrentUser(req, res) {
    const bearerHeader = req.headers["authorization"];
    const accessToken = bearerHeader.split(" ")[1];
    if (!accessToken)
      return res
        .status(404)
        .json({ success: false, message: "You are not authenticated" });
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res
            .status(404)
            .json({ success: false, message: "token is invalid" });
        }
        const user = await User.findOne({ _id: decoded.id });
        return res.status(200).json({ success: true, message: "oke", user });
      }
    );
  }
  async logout(req, res) {
    res.clearCookie("refreshToken");
    res.getLo;
    return res
      .status(200)
      .json({ success: true, message: "Logout successfully" });
  }
}

module.exports = new authController();
