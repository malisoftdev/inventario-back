import { Router } from "express"
import { sucursal } from "../controllers/sucursal"
const router = Router();

router.post("/crear", sucursal.crear);
router.put("/actualizar", sucursal.actualizar);
router.delete("/eliminar", sucursal.eliminar);
router.post("/listar", sucursal.listar);

export default router;