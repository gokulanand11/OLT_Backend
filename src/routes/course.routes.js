import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { listCourses, getCourse, createCourse } from "../controllers/course.controller.js";

const router = Router();

router.get("/", requireAuth, listCourses);
router.get("/:id", requireAuth, getCourse);
router.post("/", requireAuth, requireRole("instructor", "admin"), createCourse);

export default router;