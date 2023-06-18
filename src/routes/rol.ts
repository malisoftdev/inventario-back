import { Router } from 'express';
import { rol } from '../controllers/rol';

import { rolAuth } from "../auth"

const router: Router = Router();

router.post("/crear", rol.crear);
router.post("/actualizar", rolAuth, rol.actualizar);
router.post("/eliminar", rolAuth, rol.eliminar);
router.get("/listar", rol.listar);
router.get("/getbase", rolAuth, rol.getBase);

export default router;