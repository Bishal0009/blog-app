import { getQueryClient, HydrateClient, prefetch, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ClientGreeting } from "./client-greeting";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import TestPost from "./test-post";
import TestCreatePost from "./test-create-post";
import TestClientCreatePost from "./test-client-create-post";

export default async function TestPage() {
  // prefetch(
  //   trpc.hello.queryOptions({
  //     text: "world",
  //   })
  // );

  prefetch(trpc.testGetPost.queryOptions());

  return (
    <HydrateClient>
      {/* <ErrorBoundary fallback={<div>Something went wrong</div>}> */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* <ClientGreeting /> */}
        <TestCreatePost />
        <TestClientCreatePost />
        <TestPost />
      </Suspense>
      {/* </ErrorBoundary> */}
    </HydrateClient>
  );
}
