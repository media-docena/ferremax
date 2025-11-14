import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CarritoProvider } from './contexts/CarritoContext.jsx';

const queryClient = new QueryClient();

import router from './router.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <CarritoProvider>
      <RouterProvider router={router} />
    </CarritoProvider>
  </QueryClientProvider>
);
