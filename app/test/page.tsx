import { getQueryClient, HydrateClient, prefetch, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ClientGreeting } from "./client-greeting";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export default async function TestPage() {
  prefetch(
    trpc.hello.queryOptions({
      text: "world",
    })
  );
  return (
    <HydrateClient>
      <div>...</div>
      {/** ... */}
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientGreeting />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
