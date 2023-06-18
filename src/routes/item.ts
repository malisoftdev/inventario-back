import { item } from "../controllers/inventario/item"
import { Router } from "express"

const router:Router=Router();

router.post("/crear",item.crear);
router.put("/actualizar",item.actualizar);
router.post("/eliminar",item.eliminar);
router.post("/listar",item.listar);
router.post("/texto",item.textoActualizar);
router.post("/sufijo",item.sufijo);

export default router;