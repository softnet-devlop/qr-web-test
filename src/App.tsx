import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppRedirectPage } from '@/OpenApp';
import { PostsPage } from '@/PostsPage';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<PostsPage />} />
          <Route path='/appRedirect' element={<AppRedirectPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
