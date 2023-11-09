import { useSuspenseQuery } from "@tanstack/react-query";

import { jsonPlaceholderClient } from "./jsonPlaceholderClient";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const getPosts = async (userId: number) => {
  const url = `/users/${userId}/posts`;
  const response = await jsonPlaceholderClient.get<Post[]>(url);
  return response.data;
};

export const useGetPostsQuery = (userId: number) => {
  return useSuspenseQuery<Post[]>({
    queryKey: ["getPosts", userId],
    queryFn: () => getPosts(userId),
  });
};
