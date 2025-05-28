import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextAPI } from '../Context/ContextProvider'
import { BiSolidMoviePlay } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
const Navbar = () => {
	const { isAuth, setIsAuth, setToken, userData } = useContext(ContextAPI);

	return (
		<nav className='flex justify-between items-center md:px-8 px-2 py-4 shadow-xl bg-slate-100'>
			<Link to="/" className='flex items-center text-xl'><BiSolidMoviePlay size={37} />
				<span className='uppercase font-extrabold text-4xl'>MOVIE</span>
			</Link>
			<ul className='flex gap-4 items-center'>
				{isAuth && userData && userData?.role === "admin" && <li>
					<Link to="/add"><button className="flex items-center gap-2 cursor-pointer bg-black px-2 py-2 md:px-4 md:py-3 rounded-lg text-white font-medium">
						<FiPlusSquare className='text-xl md:text-2xl' />
						<span className='hidden md:block'>Add Movies</span>
					</button></Link>
				</li>}
				{isAuth && <li>
					<Link to={"/movie/fav"}>
						<button className="flex items-center gap-1 cursor-pointer bg-black px-2 py-2 md:px-4 md:py-3 rounded-lg text-white font-medium">
							<MdFavorite className='text-xl md:text-2xl' />
							<span className='hidden md:block'>Favourite</span>
						</button>
					</Link>
				</li>}
				{isAuth && <li>
					<button className="flex items-center gap-1 cursor-pointer bg-black px-2 py-2 md:px-4 md:py-3 rounded-lg text-white font-medium"
						onClick={() => { localStorage.clear(); setIsAuth(false); setToken("") }}
					>	<IoMdLogOut className='text-xl md:text-2xl' />
						<span className='hidden md:block'>Logout</span>
					</button>
				</li>}
			</ul>
		</nav>

	)
}

export default Navbar