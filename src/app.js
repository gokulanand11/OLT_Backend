import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import assignmentRoutes from "./routes/assignment.routes.js";
import assessmentRoutes from "./routes/assessment.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { errorHandler, notFound } from "./middleware/error.js";

const app = express();
app.disable('x-powered-by');
app.use(cors({ 
  origin: process.env.NODE_ENV === 'development' ? true : config.corsOrigin, 
  credentials: true 
}));
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => {
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('X-Frame-Options', 'DENY');
	res.setHeader('X-XSS-Protection', '1; mode=block');
	next();
});

app.get("/api/health", (req, res) => res.json({ ok: true, ts: Date.now() }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;