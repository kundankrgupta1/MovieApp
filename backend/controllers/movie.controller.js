import favModel from "../models/fav.model.js";
import movieModel from "../models/movie.model.js";
import userModel from "../models/user.model.js";

const addMovie = async (req, res) => {
	const { _id } = req.user;
	const { poster, name, genere, year, details, rating } = req.body;

	try {
		if (!poster || !name || !genere || !year || !details || !rating) {
			return res.status(401).json({
				message: "All fields are required!!!",
				success: false
			})
		}

		const user = await userModel.findById(_id).select("-password");

		if (!user) {
			return res.status(401).json({
				message: "User not found",
				success: false
			})
		}

		if (user.role !== "admin") {
			return res.status(500).json({
				message: "You're not allowes to add movies",
				success: false
			})
		}

		const newMovie = new movieModel({ poster, name, genere, year, details, rating, userId: user._id })
		await newMovie.save();

		return res.status(201).json({
			message: "Movie added",
			success: true
		})

	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

const getAllMovies = async (req, res) => {
	const { _id } = req.user;
	const { sort, search } = req.query;

	try {
		const user = await userModel.findById(_id).select("-password");

		if (!user) {
			return res.status(401).json({
				message: "User not found",
				success: false
			})
		}

		let query = {};

		if (search) {
			query.name = { $regex: search, $options: "i" };
		}

		let movieQuery = movieModel.find(query);


		if (sort === "asc") {
			movieQuery = movieQuery.sort({ year: 1 });
		} else if (sort === "desc") {
			movieQuery = movieQuery.sort({ year: -1 });
		}

		const movies = await movieQuery;

		return res.status(200).json({
			movies: movies
		})

	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
};

const updateMovie = async (req, res) => {
	const { _id } = req.user;
	const { name, genre, year, details, rating, poster, movieId } = req.body;
	try {
		const user = await userModel.findById(_id).select("-password");

		if (!user) {
			return res.status(401).json({
				message: "User not found",
				success: false
			})
		}

		const isMovie = await movieModel.findById(movieId);
		if (!isMovie) {
			return res.status(404).json({
				message: "Movies not found!!!",
				success: false
			})
		}

		if (_id.toString() !== isMovie.userId && user.role !== "admin") {
			return res.status(403).json({
				message: "You're not allowes to update movie",
				success: false
			})
		}

		if (name) isMovie.name = name
		if (genre) isMovie.genre = genre
		if (year) isMovie.year = year
		if (details) isMovie.details = details
		if (rating) isMovie.rating = rating
		if (poster) isMovie.poster = poster

		await isMovie.save()

		return res.status(200).json({
			message: "Movie updated successfully",
			success: true,
			movie: isMovie
		})

	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

const deleteMovie = async (req, res) => {
	const { _id } = req.user;
	const { movieId } = req.params;
	try {
		const user = await userModel.findById(_id).select("-password");

		if (!user) {
			return res.status(401).json({
				message: "User not found",
				success: false
			})
		}

		const isMovie = await movieModel.findById(movieId);
		if (!isMovie) {
			return res.status(401).json({
				message: "Movies not found!!!",
				success: false
			})
		}

		if (_id.toString() !== isMovie.userId && user.role !== "admin") {
			return res.status(500).json({
				message: "You're not allowes to delete movie",
				success: false
			})
		}

		await movieModel.findByIdAndDelete(movieId)

		return res.status(200).json({
			message: "Movie deleted success",
			success: true
		})

	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

const addFavMovies = async (req, res) => {
	const { _id } = req.user;
	const { movieId } = req.body;

	try {
		const user = await userModel.findById(_id).select("-password");

		if (!user) {
			return res.status(401).json({
				message: "User not found",
				success: false
			})
		}

		let favBox = await favModel.findOne({ userId: user._id })

		if (!favBox) {
			favBox = new favModel({ userId: _id, movies: [] })
		}

		const isMovie = await movieModel.findById(movieId);
		if (!isMovie) {
			return res.status(401).json({
				message: "Movies not found!!!",
				success: false
			})
		}

		const existingMovie = favBox.movies.find((movie) => movie._id.toString() === movieId)

		if (existingMovie) {
			return res.status(409).json({
				message: "Movie already in favourite list",
				success: false
			})
		}

		const favMovie = { _id: movieId, poster: isMovie.poster, name: isMovie.name, year: isMovie.year }

		favBox.movies.push(favMovie);

		await favBox.save();

		return res.status(201).json({
			message: "Movie added to favourite list",
			success: true
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

const removeFromFav = async (req, res) => {
	const { _id } = req.user;
	const { movieId } = req.params;

	try {
		const user = await userModel.findById(_id).select("-password");

		if (!user) {
			return res.status(401).json({
				message: "User not found",
				success: false
			})
		}

		let favBox = await favModel.findOne({ userId: user._id })

		if (!favBox || favBox.movies.length === 0) {
			return res.status(401).json({
				message: "Favourite list is empty",
				success: false
			})
		}


		const existingMovie = favBox.movies.find((movie) => movie._id.toString() === movieId)

		if (!existingMovie) {
			return res.status(409).json({
				message: "Movie not found",
				success: false
			})
		}

		await favModel.updateOne({ userId: user._id }, { $pull: { movies: { _id: movieId } } })

		return res.status(200).json({
			message: "Removed from Favourite",
			success: true
		})

	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

const getAllFavMovies = async (req, res) => {
	const { _id } = req.user;
	try {
		const user = await userModel.findById(_id).select("-password");
		if (!user) {
			return res.status(409).json({
				message: "User not found",
				success: false
			})
		}

		const allFavMovies = await favModel.findOne({ userId: user._id });

		return res.status(200).json({
			message: "fetched fav",
			success: true,
			fav: allFavMovies?.movies || []
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

const getSingleMovie = async (req, res) => {
	const { movieId } = req.params;
	const { _id } = req.user;
	try {
		const user = await userModel.findById(_id).select("-password");
		if (!user) {
			return res.status(409).json({
				message: "User not found",
				success: false
			})
		}
		const singleMovie = await movieModel.findById(movieId);
		if (!singleMovie) {
			return res.status(409).json({
				message: "Movie not found",
				success: false
			})
		}
		return res.status(200).json({
			movie: singleMovie
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

export default { addMovie, getAllMovies, updateMovie, deleteMovie, addFavMovies, removeFromFav, getAllFavMovies, getSingleMovie };
