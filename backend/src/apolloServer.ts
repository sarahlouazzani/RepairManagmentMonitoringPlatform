import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const createApolloServer = () => {
    return new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
    });
};

export default createApolloServer;