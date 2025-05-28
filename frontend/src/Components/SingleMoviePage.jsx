import axios from "axios";
import { SERVER } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ContextAPI } from "../Context/ContextProvider";
import { MdDelete, MdEdit, MdFavorite } from "react-icons/md";

const SingleMoviePage = () => {
	const { id } = useParams()
	const [movie, setMovie] = useState({})
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [message, setMessage] = useState("")
	const { userData } = useContext(ContextAPI)

	const { token } = useContext(ContextAPI);
	const fetchData = async () => {
		setLoading(true)
		try {
			const res = await axios.get(`${SERVER}/movie/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setMovie(res.data.movie)
			setLoading(false)
		} catch (error) {
			console.log(error);
			setLoading(false)
		}
	}

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(`${SERVER}/movie/del/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log(res);
			setTimeout(() => {
				navigate("/")
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	}

	const handleFav = async (_id) => {
		try {
			const res = await axios.post(`${SERVER}/movie/fav/add`, { movieId: _id }, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log(res);
			setMessage(res.data.message)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [])

	if (loading) {
		return (
			<div className="w-full h-screen flex justify-center items-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
			</div>
		);
	}

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
					<div className="flex gap-4 items-center">
						{userData?.role === "admin" && <button
							onClick={() => handleDelete(movie._id)}
							className="cursor-pointer float-left w-fit bg-red-600 px-4 py-2 rounded-lg flex items-center gap-1"
						>
							<MdDelete size={25} />Delete
						</button>}
						<button
							onClick={() => handleFav(movie._id)}
							className="cursor-pointer w-fit bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-1"
						>
							<MdFavorite className='text-xl md:text-2xl' />Favourite
						</button>
						{message && <p className="text-green-500">{message}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleMoviePage;
