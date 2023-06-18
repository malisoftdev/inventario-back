import { abastecer } from "../controllers/abastecer"
import { Router } from "express"

const router:Router=Router();

router.post("/crear",abastecer.crear);
router.post("/reporte",abastecer.reporte);
export default router;
