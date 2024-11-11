import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './router.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());  // Parse JSON requests

app.use('/api/auth', authRoutes);  // Authentication routes

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});