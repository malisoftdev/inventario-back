import {Router} from "express"
import {submenu} from "../controllers/submenu"
const router=Router();

router.post("/crear",submenu.crear);
router.put("/actualizar",submenu.actualizar);
router.delete("/eliminar",submenu.eliminar);
router.get("/listar",submenu.listar);

export default router;