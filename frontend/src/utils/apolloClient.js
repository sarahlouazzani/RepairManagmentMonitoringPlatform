import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authMiddleware = (operation, forward) => {
  const token = localStorage.getItem('token');
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
};

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
