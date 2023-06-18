import { Router } from 'express';
import { miempresa } from '../controllers/miempresa';
import { rolAuth } from "../auth"

const router: Router = Router();

router.post("/crear", rolAuth, miempresa.crear);
router.get("/ver", miempresa.ver);
router.put("/actualizar", rolAuth, miempresa.actualizar);

export default router;