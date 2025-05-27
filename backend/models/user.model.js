import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: "user",
		enum: ["user", "admin"]
	}
}, {timestamps: true, versionKey: false})

const userModel = mongoose.model("User", userSchema)
export default userModel;