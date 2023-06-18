import { Document } from "mongoose";
import almacen, { IAlmacen } from "../../../models/almacen/almacen";
import Lote, { ILote } from "../../../models/almacen/lote";
import { ISucursal } from "src/models/sucursal";
import { Procedure } from "../abstracts/Procedure";
import { IItemsTransferencia, ILotesSelected } from "../classes/ItemsTransferencia";

import { asyncForEach } from "../../../utils"
import { AlmacenItemClass } from "../../../controllers/almacenItem/classes/AlmacenItemClass";
import AlmacenItem, { IAlmacenItem } from "../../../models/almacen/almacenItem";
import Movimiento, { IMovimiento } from "../../../models/almacen/movimiento";
import { IMovimientoDet } from "src/models/almacen/movimientodet";

interface AlmacenItemsWork {
    almacenItemfrom: IAlmacenItem,
    almacenItemto: {
        operator: IAlmacenItem,
        update: boolean,
    }
    /* almacenItemUpdate: IAlmacenItem,
    almacenItemCreate: IAlmacenItem */
}

export class TranspasarProcedure extends Procedure {
    almacenHasta: IAlmacen;
    almacenDesde: IAlmacen;
    itemsTransferencia: Array<IItemsTransferencia>;
    almacenItemsClass: AlmacenItemClass;
    message: string | undefined;
    almacenMovimientos: AlmacenItemsWork[];
    movimiento: IMovimiento;
    movimientoDetalles:IMovimientoDet[];
    constructor(almacenDesde: IAlmacen, almacenHasta: IAlmacen, itemsTransferencia: Array<IItemsTransferencia>, fecha: string, glosa: string) {
        super();
        this.almacenHasta = almacenHasta;
        this.almacenDesde = almacenDesde;
        this.itemsTransferencia = itemsTransferencia;
        this.almacenItemsClass = new AlmacenItemClass(almacenDesde);
        this.movimiento = new Movimiento({ fecha, tipoMov: "TRANSFERENCIA", glosa, desde: almacenDesde, hasta: almacenHasta });
        this.almacenMovimientos = [];
        this.movimientoDetalles=[];
    }
    async validate(): Promise<boolean> {
        let result = true;

        await asyncForEach(this.itemsTransferencia, async (element: IItemsTransferencia) => {
            let almacenItemResult: IAlmacenItem[] = await this.almacenItemsClass.getByAlmacenItems(element.items)
            if (element.lotesSelected.length > 0) {
                await element.lotesSelected.forEach(async (elementSelected: ILotesSelected) => {
                    await almacenItemResult.forEach(async (elementResult: IAlmacenItem) => {
                        if (elementResult.lote._id == elementSelected.lote._id) {
                            //if cantidad Transferir is 0 or maybe less
                            if (elementSelected.cantidadTransferir <= 0) {
                                result = false;
                                this.message = `Elemento es tiene una cantida a tranferir no valido`
                            } else {
                                if (elementResult.cantidad >= elementSelected.cantidadTransferir) {
                                    elementResult.cantidad = elementResult.cantidad - parseInt(elementSelected.cantidadTransferir.toString())

                                    //asking if there are a almacenitem in destiny almacen if then we have to update else create
                                    let askingAlmacenItem: IAlmacenItem | null = await AlmacenItem.findOne({ almacen: this.almacenHasta, items: elementResult.items, lote: elementResult.lote });
                                    let itemMovimiento: AlmacenItemsWork;
                                    if (askingAlmacenItem) {
                                        console.log("yes exist")
                                        //new AlmacenItem({ almacen: this.almacenHasta, cantidad: elementSelected.cantidadTransferir, precio: elementResult.precio, items: elementResult.items, lote: elementResult.lote }),
                                        askingAlmacenItem.cantidad = elementSelected.cantidadTransferir;
                                        itemMovimiento = {
                                            almacenItemfrom: elementResult,
                                            almacenItemto: {
                                                operator: askingAlmacenItem,
                                                update: true
                                            }
                                        }
                                    } else {
                                        console.log("no exist")
                                        itemMovimiento = {
                                            almacenItemfrom: elementResult,
                                            almacenItemto: {
                                                operator: new AlmacenItem({ almacen: this.almacenHasta, cantidad: elementSelected.cantidadTransferir, precio: elementResult.precio, items: elementResult.items, lote: elementResult.lote }),
                                                update: false
                                            }
                                        }
                                    }

                                    this.almacenMovimientos.push(itemMovimiento);
                                } else {
                                    result = false;
                                    this.message = `Elemento es mayor a lo qu esta en la base de datos ${elementResult.cantidad} con ${elementSelected.cantidadTransferir}.`
                                }
                            }

                        }
                    });
                });
            } else {
                if (element.cantidadTransferir <= 0) {
                    result = false;
                    this.message = `Elemento es tiene una cantida a tranferir no valido`
                } else {
                    //declarando una varialbe donde se sumara todos los elementos de  este especifica item
                    let cantidadTotal: number = 0;

                    //funcion para calcular el total de un 
                    almacenItemResult.forEach(elementResult => {
                        cantidadTotal = cantidadTotal + parseInt(elementResult.cantidad.toString());
                    });

                    //si la cantidad que hay en la base de datos es menor que lo que piden 
                    if (cantidadTotal >= parseInt(element.cantidadTransferir.toString())) {
                        //creando y reconociendo cantidades exactas
                        let cantidadTransferir: number = parseInt(element.cantidadTransferir.toString());

                        //variable si seguir buscando o no;
                        let kindFind = true;

                        //realizando la funcion de recopilar lotes con el valor
                        await almacenItemResult.forEach(async (elementResult: IAlmacenItem) => {

                            let cantidadSaldo = cantidadTransferir - elementResult.cantidad;

                            if (cantidadSaldo > 0 && kindFind) {
                                let cantidadElemento: number = elementResult.cantidad;
                                elementResult.cantidad = 0;

                                //creating operator
                                //asking if there are a almacenitem in destiny almacen if then we have to update else create
                                let askingAlmacenItem: IAlmacenItem | null = await AlmacenItem.findOne({ almacen: this.almacenHasta, items: elementResult.items, lote: elementResult.lote });
                                let itemMovimiento: AlmacenItemsWork;
                                if (askingAlmacenItem) {
                                    //new AlmacenItem({ almacen: this.almacenHasta, cantidad: elementSelected.cantidadTransferir, precio: elementResult.precio, items: elementResult.items, lote: elementResult.lote }),
                                    askingAlmacenItem.cantidad = cantidadElemento;
                                    itemMovimiento = {
                                        almacenItemfrom: elementResult,
                                        almacenItemto: {
                                            operator: askingAlmacenItem,
                                            update: true
                                        }
                                    }
                                } else {
                                    itemMovimiento = {
                                        almacenItemfrom: elementResult,
                                        almacenItemto: {
                                            operator: new AlmacenItem({ almacen: this.almacenHasta, cantidad: cantidadElemento, precio: elementResult.precio, items: elementResult.items, lote: elementResult.lote }),
                                            update: false
                                        }
                                    }
                                }

                                /* let itemMovimiento: AlmacenItemsWork = {
                                    almacenItemUpdate: elementResult,
                                    almacenItemCreate: new AlmacenItem({ almacen: this.almacenHasta, cantidad: cantidadElemento, precio: elementResult.precio, items: elementResult.items, lote: elementResult.lote })
                                } */


                                //async cantidad
                                cantidadTransferir = cantidadSaldo;
                                this.almacenMovimientos.push(itemMovimiento);
                            } else {
                                cantidadSaldo = (-1) * cantidadSaldo;
                                elementResult.cantidad = cantidadSaldo;

                                //creating operator
                                //asking if there are a almacenitem in destiny almacen if then we have to update else create
                                let askingAlmacenItem: IAlmacenItem | null = await AlmacenItem.findOne({ almacen: this.almacenHasta, items: elementResult.items, lote: elementResult.lote });
                                let itemMovimiento: AlmacenItemsWork;
                                if (askingAlmacenItem) {
                                    //new AlmacenItem({ almacen: this.almacenHasta, cantidad: elementSelected.cantidadTransferir, precio: elementResult.precio, items: elementResult.items, lote: elementResult.lote }),
                                    askingAlmacenItem.cantidad = cantidadTransferir;
                                    itemMovimiento = {
                                        almacenItemfrom: elementResult,
                                        almacenItemto: {
                                            operator: askingAlmacenItem,
                                            update: true
                                        }
                                    }
                                } else {
                                    itemMovimiento = {
                                        almacenItemfrom: elementResult,
                                        almacenItemto: {
                                            operator: new AlmacenItem({ almacen: this.almacenHasta, cantidad: cantidadTransferir, precio: elementResult.precio, items: elementResult.items, lote: elementResult.lote }),
                                            update: false
                                        }
                                    }
                                }

                                /* let itemMovimiento: AlmacenItemsWork = {
                                    almacenItemUpdate: elementResult,
                                    almacenItemCreate: new AlmacenItem({ almacen: this.almacenHasta, cantidad: cantidadTransferir, precio: elementResult.precio, items: elementResult.items, lote: elementResult.lote })
                                } */
                                kindFind = false;
                                //console.log({itemMovimiento})
                                this.almacenMovimientos.push(itemMovimiento);
                            }
                        });
                    } else {
                        result = false;
                        this.message = "Total es Mayor de lo hay en la base de datos."
                    }
                }
            }
        })
        return result;
    }
    getMessage(): string | undefined {
        return this.message;
    }

    async exec(): Promise<void> {
        asyncForEach(this.almacenMovimientos, async (element: AlmacenItemsWork) => {
            if (element.almacenItemfrom.cantidad > 0) {
                console.log("this element has choiced lotes so we need update them" + element.almacenItemfrom.cantidad)
            } else {
                console.log("this element is has not lotes, so we need choice sort by datetime validating")
            }
            //console.log(element.lotesSelected)
        })
    }

    getDocument(): Document {
        return this.movimiento;
    }
}