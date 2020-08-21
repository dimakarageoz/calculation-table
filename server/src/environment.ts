export const environment = {
    DB_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/test-app',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: 8080
};
