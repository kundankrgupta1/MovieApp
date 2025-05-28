import { useContext, useEffect, useState } from "react";
import { ContextAPI } from "../Context/ContextProvider";
import { SERVER } from "../App";
import axios from "axios";

import FavCard from "./FavCard";

const Fav = () => {
	const { token } = useContext(ContextAPI);
	const [data, setData] = useState("")
	const fetchData = async () => {
		try {
			const res = await axios.get(`${SERVER}/movie/fav/all`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setData(res.data.fav)

		} catch (error) {
			console.log(error);
		}
	}

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${SERVER}/movie/fav/rem/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<div className="w-full mt-8">
			<h1 className="text-2xl font-bold text-center">Favorite Movies</h1>
			<div className="mt-8 flex flex-wrap gap-4 justify-center">
				{data && data.length === 0 && <h1 className="text-2xl font-bold text-center">No Favorite Movies</h1>}
				{data && data?.map((e) => {
					return (
						<FavCard {...e} key={e._id} handleDelete={handleDelete} />
					)
				})}
			</div>
		</div>
	)
}

export default Fav