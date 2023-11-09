import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PostsPage } from "@/PostsPage";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsPage />
    </QueryClientProvider>
  );
};
