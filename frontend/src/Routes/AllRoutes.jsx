import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateContext from './PrivateContext'
import Home from '../Pages/Home'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import AddMovie from '../Components/AddMovie'
import SingleMoviePage from '../Components/SingleMoviePage'
import Fav from '../Components/Fav'

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={
				<PrivateContext>
					<Home />
				</PrivateContext>
			} />
			<Route path="/login" element={<Login />} />
			<Route path="/reg" element={<Signup />} />
			<Route path="/add" element={
				<PrivateContext>
					<AddMovie />
				</PrivateContext>
			} />
			<Route path="/movie/:id" element={
				<PrivateContext>
					<SingleMoviePage />
				</PrivateContext>
			} />
			<Route path="/movie/fav" element={
				<PrivateContext>
					<Fav />
				</PrivateContext>
			} />

		</Routes>
	)
}

export default AllRoutes