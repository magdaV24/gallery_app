import express from 'express'
import { create_entry, delete_entry, edit_entry, fetch_if_public, fetch_user_public_works, fetch_works_by_creator } from '../queries/ArtWorks';

const router = express.Router();

router.post("/create", create_entry);
router.get("/find/:creator", fetch_works_by_creator);
router.post('/edit/:id', edit_entry); 
router.delete("/delete/:id", delete_entry) ;
router.get("/public", fetch_if_public);
router.get("/public/:creator", fetch_user_public_works)

export default router;