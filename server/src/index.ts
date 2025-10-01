import 'dotenv/config';
import express from 'express';
import notesRoutes from './routes/notes';
import { connectDB } from './db';
import { limiter } from './libs/rate-limiter';
import cors from 'cors';
import path from 'path/win32';

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
}

app.use(express.json());
app.set('trust proxy', 1);
app.use(limiter);

// Serve Vite build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

connectDB()
  .then(() => {
    console.log('Connected to database');

    // routes
    app.get('/', (_req, res) => res.json({ status: 'ok' }));
    app.use('/api/notes', notesRoutes);

    // start server
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });
