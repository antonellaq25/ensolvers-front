import { Router } from "express";
import * as noteController from "../controllers/note.controller.ts";

const router = Router();

router.post("/", noteController.create);
router.get("/", noteController.list);
router.get("/filter", noteController.filterNotes);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);
router.patch("/:id/archive", noteController.archiveNote);
router.patch("/:id/unarchive", noteController.unarchiveNote);


export default router;
