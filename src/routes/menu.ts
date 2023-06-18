import {menu} from "../controllers/menu"
import { Router } from "express"

const router:Router=Router();

router.post("/crear",menu.crear);
router.put("/actualizar",menu.actualizar);
router.delete("/eliminar",menu.eliminar);
router.get("/listar",menu.listar);

export default router;