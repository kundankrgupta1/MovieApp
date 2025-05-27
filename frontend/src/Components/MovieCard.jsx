import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ _id, poster, name, genere, year, rating, createdAt }) => {
	return (
		<Link to={`/movie/${_id}`} className="group">
			<div className="w-[200px] h-[400px] bg-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition duration-300">
				<img
					src={poster}
					alt={name}
					className="w-full h-72 object-cover"
				/>
				<div className="p-4 text-white">
					<h2 className="text-xl font-bold truncate">{name}</h2>
					<p className="text-sm text-gray-400">{genere} | {year}</p>
					<div className="flex justify-between items-center mt-2">
						<span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-sm font-semibold">
							⭐ {rating}
						</span>
						<span className="text-gray-400 text-xs">
							{new Date(createdAt).toLocaleDateString()}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;
