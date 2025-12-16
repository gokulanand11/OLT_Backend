import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getDashboardStats, getSystemStats } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/dashboard", requireAuth, getDashboardStats);
router.get("/system", requireAuth, requireRole("admin"), getSystemStats);

export default router;