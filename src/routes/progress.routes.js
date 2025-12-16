import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getCourseProgress, markLessonComplete } from "../controllers/progress.controller.js";

const router = Router();

router.get("/", requireAuth, requireRole("learner", "instructor", "admin"), getCourseProgress);
router.post("/lesson-complete", requireAuth, requireRole("learner"), markLessonComplete);

export default router;