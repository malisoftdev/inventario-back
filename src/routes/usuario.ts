import {Router} from 'express';
import {usuario} from '../controllers/usuario';
import {usuarioAuth} from "../auth"

const router:Router=Router();

router.post("/crear",usuario.crear);
router.put("/actualiar",usuarioAuth,usuario.actualizar);
router.delete("/eliminar",usuarioAuth,usuario.eliminar);
router.get("/listar",usuarioAuth,usuario.listar);

export default router;