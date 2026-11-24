import { Router } from "express";
import { bookController } from "./book.controller";

const router = Router()
router.get('/',bookController.getAllBooks)
router.post('/',bookController.createBooks)

export const bookRouter = router