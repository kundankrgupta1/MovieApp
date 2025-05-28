
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextAPI } from '../Context/ContextProvider';
import { MdDelete } from 'react-icons/md';

const MovieCard = ({ _id, poster, name, genere, year, rating, createdAt, handleDelete }) => {
	const { userData } = useContext(ContextAPI);
	return (
		<div className='relative'>
			<Link to={`/movie/${_id}`} className="group">
				<div className="w-[320px] md:w-[210px] bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
					<img
						src={poster}
						alt={name}
						className="w-full h-[420px] md:h-72 object-cover"
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
			{userData?.role === "admin" && <button
				onClick={() => handleDelete(_id)}
				className="cursor-pointer float-left w-fit bg-white text-red-600 p-2 rounded-lg flex items-center gap-1 absolute top-2 right-2"
			>
				<MdDelete size={25} />
			</button>}
		</div>
	);
};

export default MovieCard;
