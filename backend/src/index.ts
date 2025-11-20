import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import AppDataSource from './config/database';
import createApolloServer from './apolloServer';

// Import routes
import authRoutes from './routes/authRoutes';
import deviceRoutes from './routes/deviceRoutes';
import ticketRoutes from './routes/ticketRoutes';
import workflowRoutes from './routes/workflowRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// REST API Routes
app.use('/auth', authRoutes);
app.use('/devices', deviceRoutes);
app.use('/tickets', ticketRoutes);
app.use('/workflows', workflowRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Initialize database and start server
const startServer = async () => {
    try {
        // Initialize database connection
        await AppDataSource.initialize();
        console.log('✅ Database connected successfully');

        // Initialize Apollo Server for GraphQL
        const apolloServer = createApolloServer();
        await apolloServer.start();
        apolloServer.applyMiddleware({ app: app as any, path: '/graphql' });
        console.log(`✅ GraphQL endpoint ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);

        // Start Express server
        app.listen(PORT, () => {
            console.log(`✅ REST API server running on http://localhost:${PORT}`);
            console.log(`🚀 Server is ready!`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();
