import { useContext, useEffect, useState } from "react"
import { ContextAPI } from "../Context/ContextProvider"
import axios from "axios";
import { SERVER } from "../App";
import MovieCard from "../Components/MovieCard";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Home = () => {
	const { token } = useContext(ContextAPI);
	const [data, setData] = useState([])
	const [search, setSearch] = useState("")
	const [sort, setSort] = useState("")
	const [loading, setLoading] = useState(true)

	const fetchData = async () => {
		setLoading(true)
		try {
			const res = await axios.get(`${SERVER}/movie/all?search=${search}&sort=${sort}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setData(res.data.movies)
			setLoading(false)
		} catch (error) {
			console.log(error);
			setLoading(false)
		}
	}

	const handleDelete = async (_id) => {
		try {
			await axios.delete(`${SERVER}/movie/del/${_id}`, {
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
		const delay = setTimeout(() => {
			fetchData();
		}, 2000);
		return () => clearTimeout(delay);
	}, [search, sort])


	return (
		<div className="w-full m-auto mt-4 md:mt-8">
			<div className="flex justify-center gap-4 my-4">
				<div className="flex items-center gap-2 w-[200px] md:w-auto p-2 border-2 rounded-lg">
					<input type="text" placeholder="Search Movie" value={search} className="w-full outline-none" onChange={(e) => setSearch(e.target.value)} />
					{search && <IoMdCloseCircleOutline size={18} className='cursor-pointer text-red-600' onClick={() => setSearch('')} title='Clear' />}
				</div>
				<select className="p-2 border-2 rounded-lg" onChange={(e) => setSort(e.target.value)}>
					<option value="">select</option>
					<option value="asc">old to new</option>
					<option value="desc">new to old</option>
				</select>
			</div>
			<div className="mx-4 flex justify-center flex-wrap gap-4">
				{
					loading &&
					<div className="w-full h-screen flex justify-center items-center">
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
					</div>
				}
				{
					data && data.length === 0 && <h1 className="text-2xl font-bold text-center">No Movies Found</h1>
				}
				{data && data?.map((e) => {
					return (
						<MovieCard {...e} key={e._id} handleDelete={handleDelete} />
					)
				})}
			</div>
		</div>
	)
}

export default Home