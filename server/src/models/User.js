import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		admin: {
			type: Boolean,
			default: false,
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		fullName: {
			type: String,
		},
		phoneNumber: {
			type: String,
			maxLength: 12,
		},
		address: {
			type: String,
		},
		company: {
			type: String,
		},
		country: {
			type: String,
		},
		region: {
			type: String,
		},
		city: {
			type: String,
		},
		zipCode: {
			type: String,
		},
		about: {
			type: String,
		},
		role: {
			type: String,
			default: 'FullStack',
		},
		imageUrl: {
			type: String,
		},
		public_id: {
			type: String,
		},
		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
