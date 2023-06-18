import { Router } from "express"
import { modelo } from "../controllers/inventario/modelo"
const router = Router();

router.post("/crear", modelo.crear);
router.put("/actualizar", modelo.actualizar);
router.post("/eliminar", modelo.eliminar);
router.post("/listar", modelo.listar);

export default router;