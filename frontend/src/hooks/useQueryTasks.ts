import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Task } from '@prisma/client';

export const useQueryTasks = (): UseQueryResult<Task[], Error> => {
	const router = useRouter();

	const getTasks = async (): Promise<Task[]> => {
		const { data } = await axios.get<Task[]>(
			`${process.env.NEXT_PUBLIC_API_URL}/todo`
		);
		return data;
	};

	const query = useQuery<Task[], Error>({
		queryKey: ['tasks'],
		queryFn: getTasks,
	});

	if (query.error) {
		const axiosError = query.error as AxiosError;
		if (
			axiosError.response?.status === 401 ||
			axiosError.response?.status === 403
		) {
			router.push('/');
		}
	}

	return query;
};
