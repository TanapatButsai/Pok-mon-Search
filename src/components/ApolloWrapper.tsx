"use client"; // Ensure this is a Client Component

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
