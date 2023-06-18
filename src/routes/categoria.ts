import {categoria} from "../controllers/inventario/categoria"
import { Router } from "express"

const router:Router=Router();

router.post("/crear",categoria.crear);
router.post("/actualizar",categoria.actualizar);
router.delete("/eliminar",categoria.eliminar);
router.post("/listar",categoria.listar);
router.put("/activar",categoria.activar);
router.put("/desactivar",categoria.desactivar);

export default router;