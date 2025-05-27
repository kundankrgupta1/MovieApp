import mongoose from "mongoose";

const favSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	movies: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Movies",
				required: true
			},
			name: {
				type: String,
				required: true
			},
			poster: {
				type: String,
				required: true
			},
			year: {
				type: Number,
				required: true
			}
		}
	],
}, {timestamps: true, versionKey: false})

const favModel = mongoose.model("Fav", favSchema);
export default favModel;
