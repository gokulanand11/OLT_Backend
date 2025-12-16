import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { listAssignments, createAssignment, submitAssignment } from "../controllers/assignment.controller.js";

const router = Router();

router.get("/", requireAuth, listAssignments);
router.post("/", requireAuth, requireRole("instructor", "admin"), createAssignment);
router.post("/submit", requireAuth, requireRole("learner"), submitAssignment);

export default router;