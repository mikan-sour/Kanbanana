const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';

export const toDoService = dev ? 'http://localhost:8080' : 'https://something_else.com';

export const userAuthService = dev ? 'http://localhost:8081' : 'https://something_else2.com';