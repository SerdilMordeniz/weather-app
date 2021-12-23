import { ApolloClient, InMemoryCache } from "@apollo/client";

// Apollo Client initialization
// uri specifies the URL of our GraphQL server.
// cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
});

export default client;