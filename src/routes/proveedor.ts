import { proveedor } from "../controllers/inventario/proveedor"
import { Router } from "express"

const router:Router=Router();

router.post("/crear",proveedor.crear);
router.put("/actualizar",proveedor.actualizar);
router.post("/eliminar",proveedor.eliminar);
router.post("/listar",proveedor.listar);

export default router;