import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextAPI } from '../Context/ContextProvider'

const Navbar = () => {
	const { isAuth, setIsAuth, setToken } = useContext(ContextAPI);

	return (
		<nav className='text-white border-b-red-500 border-b-2 flex justify-between px-6 py-4 items-center'>
			<Link to="/">Home</Link>
			<ul className='flex gap-4 items-center'>
				{isAuth && <li>
					<Link to="/add"><button className="cursor-pointer bg-black px-4 py-3 rounded-lg text-white font-medium">Add Movies</button></Link>
				</li>}
				{isAuth && <li>
					<button className="cursor-pointer bg-black px-4 py-3 rounded-lg text-white font-medium"
						onClick={() => { localStorage.clear(); setIsAuth(false); setToken("") }}
					>
						Logout
					</button>
				</li>}
			</ul>
		</nav>

	)
}

export default Navbar