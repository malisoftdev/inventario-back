import { dosificacion } from "../controllers/factura/dosificacion"
import { Router } from "express"
const router: Router = Router();
router.post("/crear", dosificacion.crear);
router.post("/listar", dosificacion.listar);
export default router;