import { IAlmacen } from "../../../models/almacen/almacen";
import { ISucursal } from "../../../models/sucursal";
import { IItemsAlmacen, ItemsAlmacen } from "../classes/ItemsAlmacen";
import { Procedure } from "../abstracts/Procedure";

import Lote, { ILote } from "../../../models/almacen/lote";
import Movimiento, { IMovimiento } from "../../../models/almacen/movimiento";
import AlmacenItem, { IAlmacenItem } from "../../../models/almacen/almacenItem";
import MovimientoDet, { IMovimientoDet } from "../../../models/almacen/movimientodet";
import { Document } from "mongoose";

export class Abastecer extends Procedure {
   
   
    glosa:string;
    sucursal: ISucursal;
    lote: ILote;
    almacen: IAlmacen;
    itemsAbastecer: Array<IItemsAlmacen>;
    movimiento: IMovimiento;

    constructor(glosa:string,sucursal: ISucursal, lote: ILote, almacen: IAlmacen, itemsAbastecer: Array<IItemsAlmacen>) {
        super();
        this.glosa=glosa
        this.sucursal = sucursal;
        this.lote = lote;
        this.almacen = almacen;
        this.itemsAbastecer = itemsAbastecer;

        this.movimiento=new Movimiento();
    }
    async validate(): Promise<boolean> {
        //Validando si los items almacen recividos son validos
        let itemsAlmacenNew = new ItemsAlmacen(this.itemsAbastecer);
        return itemsAlmacenNew.validate();
    }
    getMessage(): string | undefined {
        throw new Error("Method not implemented.");
    }
    getDocument(): Document {
        return this.movimiento;
    }

    async exec(): Promise<void> {
        /* let movimientoNuevo = new Movimiento({ fecha: this.lote.fecha, tipoMov: "ABASTECIMIENTO", glosa:this.glosa, costoTotal: this.itemsAlmacenNew.getCostoTotal(), hasta: this.almacen });
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

        } */
    }
}
