import { dominio } from "../controllers/dominio"
import { Router } from "express"

const router:Router=Router();

router.post("/crear",dominio.crear);
router.post("/listar",dominio.listar);
export default router;
