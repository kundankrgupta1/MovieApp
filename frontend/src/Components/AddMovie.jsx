import React, { useContext, useState } from 'react'
import { ContextAPI } from '../Context/ContextProvider'
import axios from 'axios'
import { SERVER } from '../App'
import { Link, useNavigate } from 'react-router-dom'

const AddMovie = () => {
	const navigate = useNavigate();
	const [poster, setPoster] = useState("")
	const [name, setName] = useState("")
	const [year, setYear] = useState()
	const [genere, setGenere] = useState("")
	const [details, setDetails] = useState("")
	const [rating, setRating] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState(null)
	const { token } = useContext(ContextAPI);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${SERVER}/movie/add`, { poster, name, genere, year, details, rating }, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log(res);
			if (res.status === 201) {
				setMessage(res.data.message)
				setTimeout(() => {
					setMessage("")
					navigate("/")
				}, 2000)
			}
		} catch (error) {
			setError(error)
			console.log(error);
		}

	}
	return (
		<div className="w-full">
			<form onSubmit={handleSubmit} className="m-auto mt-8 px-12 py-16 w-[500px] border-2 rounded-lg">
				<h1 className="text-2xl font-bold text-center">Add Movie</h1>
				<h3>Only admin can add movies</h3>
				<div className='flex flex-col gap-6'>
					<div className='w-full flex flex-col gap-2'>
						<label>Poster: <span className='text-red-600'>*</span></label>
						<input type="text" name='name' value={poster} onChange={(e) => setPoster(e.target.value)} placeholder='Poster'
							className='border rounded-md px-4 py-2'
						/>
					</div>
					<div className='w-full flex flex-col gap-2'>
						<label>Movie Name: <span className='text-red-600'>*</span></label>
						<input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'
							className='border rounded-md px-4 py-2'
						/>
					</div>
					<div className='w-full flex flex-col gap-2'>
						<label>Year: <span className='text-red-600'>*</span></label>
						<input type="number" name='number' value={year} onChange={(e) => setYear(e.target.value)} placeholder='Year'
							className='border rounded-md px-4 py-2'
						/>
					</div>
					<div className='w-full flex flex-col gap-2'>
						<label>Genere: <span className='text-red-600'>*</span></label>
						<input type="text" name='genere' value={genere} onChange={(e) => setGenere(e.target.value)}
							placeholder='Genere'
							className='border rounded-md px-4 py-2'
						/>
					</div>
					<div className='w-full flex flex-col gap-2'>
						<label>Details: <span className='text-red-600'>*</span></label>
						<input type="text" name='details' value={details} onChange={(e) => setDetails(e.target.value)}
							placeholder='Details'
							className='border rounded-md px-4 py-2'
						/>
					</div>
					<div className='w-full flex flex-col gap-2'>
						<label>Rating: <span className='text-red-600'>*</span></label>
						<input type="text" name='rating' value={rating} onChange={(e) => setRating(e.target.value)}
							placeholder='Rating'
							className='border rounded-md px-4 py-2'
						/>
					</div>
					<button type='submit' className='bg-blue-600 px-4 py-3 rounded-md cursor-pointer'>submit</button>
					{message && <p className='text-green-600'>{message}</p>}
					{error && <p className='text-red-600'>{error}</p>}
				</div>
			</form>
		</div>
	)
}

export default AddMovie