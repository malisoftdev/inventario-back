import { Movimiento } from "../controllers/movimiento"
import { Router } from "express"

const router:Router=Router();

router.post("/abastecer",Movimiento.abastecer);
router.post("/transpasar",Movimiento.transpasar);
export default router;
