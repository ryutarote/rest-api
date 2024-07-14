import { useEffect } from 'react';
import axios from 'axios';

const useCsrfToken = () => {
	useEffect(() => {
		const getCsrfToken = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
				);
				axios.defaults.headers.common['csrf-token'] = response.data.csrf;
			} catch (error) {
				console.error('Error fetching CSRF token:', error);
			}
		};

		getCsrfToken();
	}, []);
};

export default useCsrfToken;
