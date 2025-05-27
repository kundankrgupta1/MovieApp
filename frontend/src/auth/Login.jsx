import React, { useContext, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { SERVER } from '../App';
import { ContextAPI } from '../Context/ContextProvider';

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { setIsAuth, setToken } = useContext(ContextAPI);
	const navigate = useNavigate();
	const [message, setMessage] = useState("")
	const [error, setError] = useState(null)
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${SERVER}/user/login`, { email, password })
			console.log(res);

			if (res.status === 200) {
				setMessage(res.data.message)
				setIsAuth(true)
				setToken(res.data.token)
				localStorage.setItem("token", res.data.token)
				localStorage.setItem("user", JSON.stringify(res.data.user))
			}
			setTimeout(() => {
				setMessage("")
				navigate("/")
			}, 1000)
		} catch (error) {
			setError(error.message)
			console.log(error);
		}
	}

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit} className="m-auto mt-8 px-12 py-20 w-[500px] border-2 rounded-lg">
				<h1 className="text-2xl font-bold text-center">Login</h1>
					<p>admin: k@g.com && password: 123123</p> normal user can signing up with email and password
				<div className='flex flex-col gap-6'>
					<div className='w-full flex flex-col gap-2'>
						<label>Email: <span className='text-red-600'>*</span></label>
						<input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'
							className='border rounded-md px-4 py-2'
						/>
					</div>
					<div className='w-full flex flex-col gap-2'>
						<label>Password: <span className='text-red-600'>*</span></label>
						<input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}
							placeholder='Password'
							className='border rounded-md px-4 py-2'
						/>
					</div>
					<button type='submit' className='bg-blue-600 px-4 py-3 rounded-md cursor-pointer'>Login</button>
					{message && <p className='text-green-600'>{message}</p>}
					{error && <p className='text-red-600'>{error}</p>}
					<button type='button'>Don't have an account? <Link to="/reg" className='text-blue-600 cursor-pointer'>Register</Link></button>
				</div>
			</form>
		</div>
	)
}

export default Login