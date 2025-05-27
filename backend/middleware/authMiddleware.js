import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1] || req.cookies.token
		if (!token) {
			return res.status(401).json({
				message: "token not provided!!",
				success: false
			})
		}
		jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
			if (error) {
				return res.status(401).json({
					message: "Invalid or expired token!!!",
					success: false
				})
			}
			req.user = decoded
			next();
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

export default authMiddleware;
