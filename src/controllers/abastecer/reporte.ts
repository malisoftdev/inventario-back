import Dominio, { IDominio } from "../../models/dominio"
import MiEmpresa,{IMiempresa} from "../../models/miempresa"
import { Request, Response } from "express";
import miempresa from "../../models/miempresa";
import Lote,{ILote} from "../../models/almacen/lote";
import Movimiento,{ IMovimiento } from "../../models/almacen/movimiento";
import MovimientoDet,{ IMovimientoDet } from "../../models/almacen/movimientodet";
import AlmacenItem, { IAlmacenItem } from "../../models/almacen/almacenItem";

/* import Dominio, { IDominio } from "../../models/dominio"
import MiEmpresa,{IMiempresa} from "../../models/miempresa"
import { Request, Response } from "express";
import miempresa from "../../models/miempresa";
import Movimiento,{ IMovimiento } from "../../models/almacen/movimiento";
import MovimientoDet,{ IMovimientoDet } from "../../models/almacen/movimientodet";
 */
export const reporte = async (req: Request, res: Response) => {
    let { movimiento } = req.body;
    let miempresaResult:IMiempresa|null=await MiEmpresa.findOne();

    if(!miempresaResult)return res.status(404).json({message:"No hay una Empresa registrada"});
    if(!movimiento) return res.status(404).json({message:"No hay un el Documento de movimiento"});
    
    let movimientoResult:IMovimiento|null =await Movimiento.findOne({_id:movimiento}).populate("dominio").populate("hasta").exec();
    if(!movimientoResult) return res.status(404).json({message:"No exite un el Documento de movimiento"});

    let movimientosDetsResult:Array<IMovimientoDet>=await MovimientoDet.find({movimiento:movimientoResult}).populate("items").populate("lote").exec();

    if(movimientosDetsResult.length>0){
        console.log("REsultado es correcoto")
    } 

    /* let almacenItemsResult:Array<IAlmacenItem>=await AlmacenItem.find({lote:loteResult}).populate("items").populate("almacen").exec(); */

    /* let { movimiento } = req.body;
    let miempresaResult:IMiempresa|null=await MiEmpresa.findOne();

    if(!miempresaResult)return res.status(404).json({message:"No hay una Empresa registrada"});
    if(!movimiento) return res.status(404).json({message:"No hay un el Documento de movimiento"});

    let movimientoResult:IMovimiento|null =await Movimiento.findOne({_id:movimiento}).populate("dominio").exec();
    if(!movimientoResult) return res.status(404).json({message:"No exite un el Documento de movimiento"});

    let movimientosDetsResult:Array<IMovimientoDet>=await MovimientoDet.find({movimiento:movimientoResult}).populate("items").populate("lote").exec();

    if(movimientosDetsResult.length>0){

    } */

    res.status(200).json({miempresa:miempresaResult,movimiento:movimientoResult,movimientodet:movimientosDetsResult});
}