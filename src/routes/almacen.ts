import { almacen } from "../controllers/almacen/"
import { Router } from "express"

const router:Router=Router();

router.post("/crear",almacen.crear);
router.post("/listar",almacen.listar);
router.post("/visible",almacen.visible);
export default router;

