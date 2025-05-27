import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import movieController from "../controllers/movie.controller.js";

const movieRouter = express.Router();

movieRouter.post("/add", authMiddleware, movieController.addMovie)
movieRouter.get("/all", authMiddleware, movieController.getAllMovies)
movieRouter.patch("/update", authMiddleware, movieController.updateMovie)
movieRouter.delete("/del/:movieId", authMiddleware, movieController.deleteMovie)
movieRouter.get("/:movieId", authMiddleware, movieController.getSingleMovie)


movieRouter.post("/fav/add", authMiddleware, movieController.addFavMovies)
movieRouter.get("/fav/all", authMiddleware, movieController.getAllFavMovies);
movieRouter.delete("/fav/rem/:movieId", authMiddleware, movieController.removeFromFav)

export default movieRouter;
