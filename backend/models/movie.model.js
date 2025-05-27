import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
	poster: {
		type: String,
		required: true
	},
	name: {
		type: String,
		trim: true,
		required: true,
	},
	genere: {
		type: String,
		trim: true,
		required: true
	},
	year: {
		type: Number,
		required: true,
		trim: true
	},
	details: {
		type: String,
		required: true,
	},
	rating: {
		type: String,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true
	}
}, {timestamps: true, versionKey: false})

const movieModel = mongoose.model("Movies", movieSchema)

export default movieModel;
