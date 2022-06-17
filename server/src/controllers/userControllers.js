import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcrypt';
import cloudinary from '../utils/cloudinary';

class userControllers {
	// Delete user by id
	async deleteUser(req, res) {
		try {
			const id = req.query.id;
			if (!id)
				return res
					.status(404)
					.json({ success: false, message: ' missing the parameter' });
			if (!mongoose.isValidObjectId(id)) {
				return res
					.status(404)
					.json({ success: false, message: 'User not found' });
			}
			const user = await User.findByIdAndDelete(id);
			if (!user) {
				return res
					.status(404)
					.json({ success: false, message: 'User is not exist' });
			}
			await cloudinary.uploader.destroy(`SOCIAL_APP/${id}`, {});
			return res
				.status(200)
				.json({ success: true, message: 'Delete user successfully' });
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: 'internal error server' });
		}
	}
	// Create a new user
	async createUser(req, res) {
		const {
			fullName,
			email,
			phoneNumber,
			country,
			region,
			city,
			address,
			zipCode,
			company,
			role,
		} = req.body;
		try {
			const user = await User.findOne({ email: email });
			if (user)
				return res
					.status(404)
					.json({ success: false, message: 'email already exists' });

			const passwordDefault = '123456';
			const passwordHash = bcrypt.hashSync(passwordDefault, 10);
			const newUser = User({
				fullName,
				email,
				password: passwordHash,
				phoneNumber,
				country,
				region,
				city,
				address,
				zipCode,
				company,
				role,
			});
			await newUser.save();
			return res.status(200).json({
				success: true,
				message: 'Create user successfully',
				user: newUser,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: 'internal error server',
				error: error.message,
			});
		}
	}
	// update user
	async updateUser(req, res) {
		try {
			const id = req.query.id;
			const {
				fullName,
				phoneNumber,
				address,
				country,
				region,
				city,
				zipCode,
				about,
				company,
				imageUrl,
			} = req.body;
			let upload = null;
			if (!id)
				return res
					.status(410)
					.json({ success: false, message: 'User is not exists' });
			if (!mongoose.isValidObjectId(id))
				return res
					.status(404)
					.json({ success: false, message: 'User is not valid' });
			if (req?.file?.path) {
				upload = await cloudinary.uploader.upload(req.file.path, {
					upload_preset: 'SOCIAL_APP',
					overwrite: true,
					public_id: id,
				});
			}
			const user = await User.findOneAndUpdate(
				{ _id: id },
				{
					fullName,
					address: address,
					phoneNumber: phoneNumber,
					country,
					company,
					region,
					city,
					zipCode,
					about,
					imageUrl: upload?.secure_url,
				},
				{ new: true }
			);
			return res
				.status(200)
				.json({ success: true, message: 'Updated successfully', user });
		} catch (error) {
			console.log(error.message);
			return res
				.status(500)
				.json({ success: false, message: 'internal error server' });
		}
	}
	// Get all users
	async getAllUsers(req, res) {
		try {
			const user = await User.find({});
			if (!user)
				return res
					.status(404)
					.json({ success: false, message: 'User not found' });
			return res.status(200).json({
				success: true,
				message: 'Get all user successfully',
				data: user,
			});
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: 'internal error server' });
		}
	}
	async getUserById(req, res) {
		try {
			const id = req.query.id;
			if (!id)
				return res
					.status(410)
					.json({ success: false, message: 'User is not exists' });
			if (!mongoose.isValidObjectId(id))
				return res
					.status(404)
					.json({ success: false, message: 'User is not valid' });
			const user = await User.findById(id);
			if (!user)
				return res
					.status(404)
					.json({ success: false, message: 'user not found' });
			return res.status(200).json({
				success: true,
				message: 'Get user successfully',
				data: user,
			});
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: 'internal error server', error });
		}
	}
	async getUser(req, res) {
		try {
			let limit = req.query.limit;
			if (!limit) limit = 10;
			const user = await User.find({})
				.limit(limit)
				.sort({ 'updateAt': 1 })
				.select('-password');
			if (!user)
				return res
					.status(404)
					.json({ success: false, message: 'user not found' });
			return res.status(200).json({
				success: true,
				message: 'Get user successfully',
				data: user,
			});
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: 'internal error server', error });
		}
	}
}

module.exports = new userControllers();
