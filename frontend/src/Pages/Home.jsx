import { useContext, useEffect, useState } from "react"
import { ContextAPI } from "../Context/ContextProvider"
import axios from "axios";
import { SERVER } from "../App";
import MovieCard from "../Components/MovieCard";

const Home = () => {
	const { token } = useContext(ContextAPI);
	const [data, setData] = useState([])

	console.log("Movie Data", data);

	const fetchData = async () => {
		try {
			const res = await axios.get(`${SERVER}/movie/all`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log(res);
			setData(res.data.movies)
		} catch (error) {
			console.log(error);

		}
	}

	useEffect(() => {
		fetchData();
	}, [])
	return (
		<div className="w-11/12 mx-auto m-18 flex flex-wrap justify-center gap-8">
			{data && data?.map((e) => {
				return (
					<MovieCard {...e} key={e._id} />
				)
			})}
		</div>
	)
}

export default Home