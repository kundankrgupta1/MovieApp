import React from 'react'
import AllRoutes from './Routes/AllRoutes'
import Navbar from './Components/Navbar'
export const SERVER = "http://localhost:8080"
const App = () => {
	return (
		<div>
			<Navbar />
			<AllRoutes />
		</div>
	)
}

export default App