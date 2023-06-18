import { Router } from 'express';
import usuarioRouter from "./usuario";
import rolRouter from "./rol";
import menuRouter from "./menu"
import submenuRouter from "./submenu"
import miempresaRouer from "./miempresa"
import categoriaRouter from "./categoria";
import sucursalRouter from "./sucursal";
import dosifRouter from "./dosificacion";
import marcaRouter from "./marca"
import modeloRouter from "./modelo"
import proveedorRouter from "./proveedor"
import itemRouter from "./item"
import campoRouter from "./campo"
import precioRouter from "./precio"
import almacenRouter from "./almacen"
import abastecerRouter from "./abastecer"
import dominioRouter from "./dominio"
import almacenItemRouter from "./almacenItem"
import movimientoRouter from "./movimiento"

import { loginAuth, autoLoginAuth } from '../auth';
const router: Router = Router();

router.use("/usuario", usuarioRouter);
router.use("/rol", rolRouter);
router.use("/menu", menuRouter);
router.use("/submenu", submenuRouter);
router.use("/miempresa", miempresaRouer);
router.use("/categoria", categoriaRouter);
router.use("/sucursal", sucursalRouter);
router.use("/dosificacion", dosifRouter);
router.use("/categoria", categoriaRouter);
router.use("/sucursal", sucursalRouter);
router.use("/marca", marcaRouter);
router.use("/modelo", modeloRouter);
router.use("/item", itemRouter);
router.use("/proveedor", proveedorRouter);
router.use("/campo", campoRouter);
router.use("/precio", precioRouter);
router.use("/almacen", almacenRouter);
router.use("/abastecer", abastecerRouter);
router.use("/dominio", dominioRouter);
router.use("/almacenitem", almacenItemRouter);
router.use("/movimiento",movimientoRouter);

//not a route but important your function to user could start interaction with the system
router.post("/login", loginAuth);
router.get("/autologin", autoLoginAuth);

export default router;
