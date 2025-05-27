import { createContext, useState } from "react"

export const ContextAPI = createContext()
const ContextProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(localStorage.getItem("token") ? true : false)
	const [token, setToken] = useState(localStorage.getItem("token"))
	const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")))

	return (
		<ContextAPI.Provider value={{ isAuth, setIsAuth, token, setToken, userData, setUserData }}>
			{children}
		</ContextAPI.Provider>
	)
}

export default ContextProvider;
