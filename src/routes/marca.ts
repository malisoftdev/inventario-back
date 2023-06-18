import {Router} from "express"
import {marca} from "../controllers/inventario/marca"
const router=Router();

router.post("/crear",marca.crear);
router.put("/actualizar",marca.actualizar);
router.post("/eliminar",marca.eliminar);
router.post("/listar",marca.listar);

export default router;