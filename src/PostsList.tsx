import { useGetPostsQuery } from '@/useGetPostsQuery';

type Props = {
  userId: number;
};

export const PostsList = (props: Props) => {
  const { userId } = props;
  const { data } = useGetPostsQuery(userId);

  
  return (
    <>
      <h1>Posts by User ID {userId}</h1>
      {data?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
};
