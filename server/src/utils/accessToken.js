import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Generate access token
export const generateAccessToken = (user) => {
	return jwt.sign(
		{ id: user.id, admin: user.admin },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '1h' }
	);
};

// Generate refresh token
export const generateRefreshToken = (user) => {
	return jwt.sign(
		{ id: user.id, admin: user.admin },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '365d' }
	);
};
