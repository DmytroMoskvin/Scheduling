import * as React from 'react';
import { Link } from 'react-router-dom';

interface ErrorProps {
	message: string
}

const Error :React.FunctionComponent<ErrorProps> = ({message}) => {

	return (
		<React.Fragment>
			<main>
				<h1>{message}</h1>
				<Link to='/'>Return home</Link>
			</main>
		</React.Fragment>
	)
}

export default Error;