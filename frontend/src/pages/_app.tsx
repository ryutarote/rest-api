import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import useCsrfToken from '@/hooks/useCsrfToken';
import Layout from '@/components/Layout';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

export default function App({ Component, pageProps }: AppProps) {
	axios.defaults.withCredentials = true;
	useCsrfToken();

	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</QueryClientProvider>
	);
}
