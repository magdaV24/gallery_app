import express from 'express'
import { create_user, get_user_by_username, login } from '../queries/User'
const router = express.Router();

router.post("/create", create_user);
router.post("/login", login);
router.get('/fetch/:username', get_user_by_username)

export default router;