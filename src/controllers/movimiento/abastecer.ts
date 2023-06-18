import { Request, Response } from "express"

import { asyncForEach } from "../../utils"
import { IItemsAlmacen, ItemsAlmacen } from "./classes/ItemsAlmacen";
import Lote, { ILote } from "../../models/almacen/lote";
import Movimiento, { IMovimiento } from "../../models/almacen/movimiento";
import AlmacenItem, { IAlmacenItem } from "../../models/almacen/almacenItem";
import MovimientoDet, { IMovimientoDet } from "../../models/almacen/movimientodet";
import Almacen, { IAlmacen } from "../../models/almacen/almacen";
import { Abastecer } from "./procedures/Abastecer";
//import { Transferir } from "./procedures/TranspasarProcedure";
import { Procedure } from "./abstracts/Procedure";

export default async (req: Request, res: Response) => {
    let { sucursal, lote, almacen, itemsAbastecer, glosa, movimientoTipo } = req.body;

    //valitations id to storage later
    if (sucursal._id == ''!) return res.status(404).json({ message: "No hay una Sucursal" });
    if (lote.proveedor._id == ''!) return res.status(404).json({ message: "No hay un Proveedor" });
    //if (almacen._id == ''!) return res.status(404).json({ message: "No hay un almacen" });
    //if (itemsAbastecer.length < 1) return res.status(404).json({ message: "No hay items que agregar" });
    if (!movimientoTipo) return res.status(404).json({ message: "No hay tipo de movimiento a realizar" });

    /* if(movimientoTipo=="TRANSFERIR"){
        let { almacenDesde, almacenHasta,itemsTransferencia}=req.body;
        let nuevaTransferencia:Procedure=new Transferir(almacenDesde,almacenHasta,itemsTransferencia);
        if(nuevaTransferencia.validate()){
            
        }
    } */

    //validando tipo de movimiento a realizar
    /* switch (movimientoTipo) {
        case "ABASTECER": {
            console.log("Abastecer")
            if (almacen._id == ''!) return res.status(404).json({ message: "No hay un almacen" });
            if (itemsAbastecer.length < 1) return res.status(404).json({ message: "No hay items que agregar" });
            let nuevoAbastecimiento=new Abastecer(glosa,sucursal,lote,almacen,itemsAbastecer);
            if(nuevoAbastecimiento.validate()){
                await nuevoAbastecimiento.exec();
                return res.status(200).json({ movimiento: nuevoAbastecimiento.getDocument()});
            }else{
                return res.status(500).json({ menssage:"Parametros Invalidos" })
            }
        }
        case "TRANSFERENCIA": {
            console.log("transfiriendo")
            return res.status(200).json({ movimiento: { _id: "lo siento" } })
        }
        default: {
            console.log("Movimiento no Valido a realizar")
            return res.status(404).json({ message: "No hay tipo de movimiento valido a realizar" });
        }
    } */
    
    


    //Validando si los items almacen recividos son validos
    let itemsAlmacenNew = new ItemsAlmacen(itemsAbastecer);
    if (!itemsAlmacenNew.validate()) return res.status(500).json({ message: itemsAlmacenNew.getMessage() });

    //creando el movimiento a realizar
    //----tipoMov-> tipo movimiento esta en un string dentro de la base de datos    
    let movimientoNuevo = new Movimiento({ fecha: lote.fecha, tipoMov: "ABASTECIMIENTO", glosa, costoTotal: itemsAlmacenNew.getCostoTotal(), hasta: almacen });
    let movimientoGuardado = await movimientoNuevo.save();

    let itemsProcesar = itemsAlmacenNew.getAlmacenItems()
    await itemsProcesar.forEach(async (itemsElement: IItemsAlmacen, index: number) => {
        //-------Crear nuevo lote-------
        let loteNuevo: ILote;
        if (itemsElement.items.peresedero) {
            loteNuevo = new Lote({
                fecha: lote.fecha,
                nroLote: getCodigoLote(lote.fecha, movimientoGuardado._id, itemsElement.items.nombre, index),
                tipo_documento: lote.tipo_documento,
                documento: lote.documento,
                proveedor: lote.proveedor,
            })
        } else {
            loteNuevo = new Lote({
                fecha: lote.fecha,
                fechaVencimiento: itemsElement.fechaVencimiento,
                nroLote: getCodigoLote(lote.fecha, movimientoGuardado._id, itemsElement.items.nombre, index),
                tipo_documento: lote.tipo_documento,
                documento: lote.documento,
                proveedor: lote.proveedor,
            })
        }
        let loteGuardado = await loteNuevo.save();
        //console.log(loteGuardado);

        let nuevoAlmacenItem = new AlmacenItem({ items: itemsElement.items, almacen, cantidad: itemsElement.cantidad, precio: itemsElement.precioTotal, lote: loteGuardado })
        let almacenItemGuardado = await nuevoAlmacenItem.save();
        //console.log(almacenItemGuardado);
        //validando si ya habia algun otro movimiendo detalle similar
        const MovimientoItemLast: IMovimientoDet | null = await MovimientoDet.findOne({ items: itemsElement.items._id }, {},).sort({ 'createdAt': -1 });
        let cantidadAnterior: number = 0;
        let cantidadActual: number = 0;
        let cantidad: number = itemsElement.cantidad;

        if (MovimientoItemLast) {

            //cantidadAnterior = MovimientoItemLast.cantidadActual;
            cantidadAnterior = parseInt(MovimientoItemLast.cantidadActual + "")
            //cantidadActual = cantidadAnterior + itemsElement.cantidad;
            cantidadActual = cantidadAnterior + parseInt(itemsElement.cantidad + "");
            //console.log(parseInt(MovimientoItemLast.cantidadActual+"")+parseInt(itemsElement.cantidad+""))
        } else {
            cantidadAnterior = 0;
            cantidadActual = itemsElement.cantidad;
        }
        //------------------------------------------------------------

        let nuevoMovimientoDet = new MovimientoDet({ lote: loteGuardado, movimiento: movimientoGuardado, items: itemsElement.items, costo: itemsElement.precioTotal, cantidadAnterior, cantidad, cantidadActual })
        let movimientoDetGuardado = await nuevoMovimientoDet.save();
        //console.log(movimientoDetGuardado);
    });

    res.status(200).json({ movimiento: movimientoGuardado });
}

let getCodigoLote = (fecha: string, _idMovimiento: string, nombreItem: string, indexItem: number): string => {
    let fechaEdited = new Date(fecha);
    let año = fechaEdited.getFullYear()
    let sequenceID: string = "";
    let length_id: number = (_idMovimiento).toString().length;
    let string_id: string = (_idMovimiento).toString();
    for (let index = length_id - 1; index > length_id - 3; index--) {
        sequenceID = sequenceID + string_id[index];
    }
    let sequenceNombre: string = "";
    let lengthNombre: number = nombreItem.length > 3 ? 3 : nombreItem.length;
    for (let index1 = 0; index1 < lengthNombre; index1++) {
        sequenceNombre = sequenceNombre + nombreItem[index1];
    }
    console.log("Codigo resultante: " + `${año}-${sequenceID.toString()}-${sequenceNombre.toString()}-${indexItem.toString()}`)
    return `${año}-${sequenceID.toString()}-${sequenceNombre.toString()}-${indexItem.toString()}`;
}