import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getProfile, updateProfile, changePassword, getStats } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", requireAuth, getProfile);
router.put("/profile", requireAuth, updateProfile);
router.put("/password", requireAuth, changePassword);
router.get("/stats", requireAuth, requireRole("admin"), getStats);

export default router;