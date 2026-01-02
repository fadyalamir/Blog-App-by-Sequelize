import * as registrationService from './services/registration.service.js'
import { Router } from "express";

const router = Router();

router.post("/signup", registrationService.signup)
router.post("/login", registrationService.login)
export default router;