import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getAssessment, createAssessment, submitAssessment } from "../controllers/assessment.controller.js";
import { getQuizByCourse } from "../controllers/quiz.controller.js";

const router = Router();

router.get("/course/:courseId", requireAuth, getQuizByCourse);
router.get("/:id", requireAuth, getAssessment);
router.post("/", requireAuth, requireRole("instructor", "admin"), createAssessment);
router.post("/:id/submit", requireAuth, requireRole("learner"), submitAssessment);

export default router;