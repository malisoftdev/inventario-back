import { IAlmacenItem } from "src/models/almacen/almacenItem";
import almacen from "src/models/almacen/almacen";
import { IItems } from "../../../models/almacen/items";

export interface IItemsAlmacen{
    items:IItems;
    cantidad:number;
    precio:number;
    precioTotal:number;
    fechaVencimiento:string;
}

export class ItemsAlmacen{
    private almacenItems:Array<IItemsAlmacen>;
    private validator:boolean;
    private message:string="";
    constructor(almacenItems:Array<IItemsAlmacen>){
        this.almacenItems=almacenItems;
        this.validator=true;
    }
    validate():boolean{
        this.almacenItems.forEach(item=>{
            if(item.cantidad==0){
                this.validator=false;
                this.message="No se puede ingresar un producto con cantidad 0."
            }
            if(item.precio==0){
                this.validator=false;
                this.message="Un producto tien que su precio es 0."
            }
            if(item.cantidad<1){
                console.log("Cantidad negativa convirtiendo en valor absoluto.")
                item.cantidad=item.cantidad*(-1)
            }
            if(item.precio<1){
                console.log("Este producto tiene valor negativo voliviando como numero absoluto.")
                item.precio=item.precio*(-1)
            }
            //Comprobando el precio total en caso de que el cliente envie los datos incorrectos
            item.precioTotal=item.precio*item.cantidad;
        })
        return this.validator;
    }
    getMessage():string{
        return this.message;
    }
    getAlmacenItems():Array<IItemsAlmacen>{
        return this.almacenItems;
    }
    getCostoTotal():number{
        let costoTotal:number=0;
        this.almacenItems.forEach(item=>{
            costoTotal=costoTotal+item.precioTotal;
        });       
        return costoTotal;
    }
}