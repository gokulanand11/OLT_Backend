import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { validate, schemas } from "../middleware/validation.js";
import { rateLimit } from "../middleware/rateLimit.js";

const router = Router();

// Rate limit auth endpoints
router.use(rateLimit(10, 15 * 60 * 1000)); // 10 requests per 15 minutes

router.post("/signup", validate(schemas.signup), signup);
router.post("/login", validate(schemas.login), login);

export default router;