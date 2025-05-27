import axios from "axios";
import { SERVER } from "../App";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ContextAPI } from "../Context/ContextProvider";

const SingleMoviePage = () => {
	const { id } = useParams()
	const [movie, setMovie] = useState({})
	const { token } = useContext(ContextAPI);
	const fetchData = async () => {
		try {
			const res = await axios.get(`${SERVER}/movie/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log(res);
			setMovie(res.data.movie)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [])
	return (
		<div className="min-h-screen bg-zinc-950 text-white py-10 px-6 md:px-20">
			<div className="flex flex-col md:flex-row gap-10">
				<img
					src={movie.poster}
					alt={movie.name}
					className="w-full md:w-[300px] rounded-xl shadow-2xl"
				/>
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl font-extrabold">{movie.name}</h1>
					<p className="text-yellow-400 text-lg font-semibold">⭐ {movie.rating}</p>
					<p className="text-gray-400">{movie.year} | {movie.genere}</p>
					<p className="text-lg mt-4">{movie.details}</p>
					<p className="text-sm text-gray-500 mt-6">Published: {new Date(movie.createdAt).toLocaleDateString()}</p>
				</div>
			</div>
		</div>
	);
};

export default SingleMoviePage;
