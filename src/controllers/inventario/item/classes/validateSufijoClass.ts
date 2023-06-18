import Item, { IItems } from "../../../../models/almacen/items"
import { Request, Response, text } from "express"

export class ValidateSufijo{
    sufijo:string;
    constructor(sufijo:string){
        this.sufijo=sufijo;
    }
    async validate():Promise<boolean>{
        if(this.sufijo==''!)return false;
        let item: IItems | null = await Item.findOne({ sufijo:this.sufijo });
        return item ? false:true;
    }
}
