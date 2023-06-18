import {Router} from "express"
import {precio} from "../controllers/inventario/precio"
const router=Router();

router.post("/crear",precio.crear);
router.put("/actualizar",precio.actualizar);
router.post("/eliminar",precio.eliminar);
router.post("/listar",precio.listar);

export default router;