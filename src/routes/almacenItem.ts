import {almacenItem} from "../controllers/almacenItem";
import { Router } from "express";

const router:Router=Router();
router.post("/listar",almacenItem.listar);

export default router;