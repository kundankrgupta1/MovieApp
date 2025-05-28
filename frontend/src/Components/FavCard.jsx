import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const FavCard = ({ _id, poster, name, year, handleDelete }) => {
	return (
		<div className="relative w-[200px] h-[300px] rounded-lg overflow-hidden"
			style={{
				boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
			}}
		>
			<Link to={`/movie/${_id}`} className=" rounded-lg" key={_id}
			>
				<img src={poster} alt=""
					className="w-[200px] h-[250px] object-cover"
				/>
				<div className="m-2 flex gap-4 justify-center items-center">
					<h2 className="text-xl font-bold truncate w-22">{name}</h2>
					<p>{year}</p>
				</div>
			</Link>
			<button className="cursor-pointer bg-white p-1 rounded-md absolute top-2 right-2"
				onClick={() => handleDelete(_id)}
			><MdDelete className="text-2xl text-red-600" /></button>
		</div>

	)
}

export default FavCard;