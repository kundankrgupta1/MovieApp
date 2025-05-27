import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";
dotenv.config();
const userReg = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) {
			return res.status(401).json({
				message: "All fields are required!!!",
				success: false
			})
		}
		const user = await userModel.findOne({ email });
		if (user) {
			return res.status(409).json({
				message: "User already registered!!!",
				success: false
			})
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = new userModel({ name, email, password: hashPassword });

		await newUser.save()

		return res.status(201).json({
			message: "Registration success!!!",
			success: true
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: true
		})
	}
}

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(409).json({
				message: "User not found",
				success: false
			})
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(401).json({
				message: "Wrong email/password",
				success: false
			})
		}

		const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_KEY)

		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000
		})

		return res.status(200).json({
			message: "Login success!!!",
			success: true,
			token,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role
			}
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

const getProfile = async (req, res) => {
	const { _id } = req.user;
	try {
		const user = await userModel.findById(_id).select("-password");
		if (!user) {
			return res.status(409).json({
				message: "User not found",
				success: false
			})
		}

		return res.status(200).json({
			message: "user profile",
			success: true,
			user
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

export default { userReg, userLogin, getProfile };
