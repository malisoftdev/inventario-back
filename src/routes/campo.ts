import {campo} from "../controllers/inventario/campo"
import { Router } from "express"

const router:Router=Router();

router.post("/crear",campo.crear);
router.post("/actualizar",campo.actualizar);
router.delete("/eliminar",campo.eliminar);
router.post("/listar",campo.listar);
router.put("/activar",campo.activar);
router.put("/desactivar",campo.desactivar);
export default router;
