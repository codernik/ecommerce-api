import express from "express";
import rateLimiter from "./middlewares/rateLimiter.js";
import apiRoutes from "./routes/api.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Determine the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

// rate limiter middleware applied globally
app.use(rateLimiter);
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
