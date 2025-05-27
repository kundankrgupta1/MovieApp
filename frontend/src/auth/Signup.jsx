import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { SERVER } from '../App'
import { useState } from 'react'

const Signup = () => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState(null)
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${SERVER}/user/reg`, { name, email, password })
			console.log(res);
			if (res.status === 201) {
				setMessage(res.data.message)
				setTimeout(() => {
					setMessage("")
					navigate("/login")
				}, 1000)
			}
		} catch (error) {
			setError(error.message)
			console.log(error);
		}
	}
	return (
		<div className="w-full">
			<form onSubmit={handleSubmit} className="m-auto mt-8 px-12 py-16 w-[500px] border-2 rounded-lg">
				<h1 className="text-2xl font-bold text-center">Registration</h1>

				<div className='flex flex-col gap-6'>
					<div className='w-full flex flex-col gap-2'>
						<label>Name: <span className='text-red-600'>*</span></label>
						<input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'
							className='border rounded-md px-4 py-2'
						/>
					</div>
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
					<button type='button'>Already have an account? <Link to="/login" className='text-blue-600 cursor-pointer'>Login</Link></button>
				</div>
			</form>
		</div>
	)
}

export default Signup