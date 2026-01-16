import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Imports
import uploadRoute from './routes/upload.js';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your React app to talk to this backend
app.use(express.json()); // Allows the server to understand JSON

// Routes
app.use('/upload', uploadRoute);

// The "Hello World" Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! The Samegrelo Scouts backend is running. 🌲');
}); 

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is flying at http://localhost:${PORT}`);
});