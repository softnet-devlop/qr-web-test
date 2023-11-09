import { useState, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { PostsList } from "@/PostsList";
import { UserIdSelect } from "@/UserIdSelect";

export const PostsPage = () => {
  const [userId, setUserId] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.currentTarget.value));
  };

  const handleError = (error: Error) => {
    console.error(error);
  };

  return (
    <>
      <UserIdSelect handleChange={handleChange} />
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onError={handleError}
      >
        <Suspense fallback={<SuspenseFallback />}>
          <PostsList userId={userId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
  console.error(error);
  return <h1>Error!!!</h1>;
};

const SuspenseFallback = () => {
  return <h1>Loading...</h1>;
};
