import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/navbar';
import Routes from './routes';

import './index.css';

const qc = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30_000, // avoid refetch spam
			refetchOnWindowFocus: false,
			retry: 1
		}
	}
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={qc}>
			<BrowserRouter>
				<Navbar />
				<Routes />
				<Toaster position='bottom-right' />
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
);
