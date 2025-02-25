import ApolloWrapper from "@/components/ApolloWrapper";

export const metadata = {
  title: "Search Pokemon",
  description: "A Next.js GraphQL-powered Pokemon search app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}