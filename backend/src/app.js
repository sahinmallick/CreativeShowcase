import express from 'express'
import healthCheckRouter from './routes/healthCheck.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express()

app.use('/api/v1/healthcheck', healthCheckRouter)
app.use('/api/v1/auth', authRouter)


export default app;