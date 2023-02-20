import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
	return (
		<div>
			<Link to={'/login'}>Login</Link>
		</div>
	)
}

export default Public
