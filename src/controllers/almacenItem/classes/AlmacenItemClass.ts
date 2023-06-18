import Items, { IItems } from "../../../models/almacen/items";
import { IAlmacen } from "../../../models/almacen/almacen";
import AlmacenItem, { IAlmacenItem } from "../../../models/almacen/almacenItem";
import { asyncForEach } from "../../../utils";
import { Types } from "mongoose";

export interface IItemsCantidad {
    items: IItems,
    cantidad: number
}

export class AlmacenItemClass {
    almacen: IAlmacen;
    itemsArray: Array<IItems>;
    items: IItems | undefined;

    constructor(almacen: IAlmacen) {
        this.almacen = almacen;
        this.itemsArray = [];
    }
    async getByAlmacenItemsArrayCantidad(): Promise<Array<IItemsCantidad>> {
        let almacenItemsResult: Array<IItemsCantidad> = []
        try {
            almacenItemsResult = await AlmacenItem
                .aggregate([
                    {
                        $match: {
                            almacen: Types.ObjectId(this.almacen.toString())
                        }
                    },
                    {

                        $group: {
                            _id: {
                                items: '$items',
                            },
                            cantidad: { $sum: '$cantidad' }
                        }
                    },
                    {
                        $lookup:
                        {
                            from: "items",
                            localField: "_id.items",
                            foreignField: "_id",
                            as: "items"
                        }
                    },
                    {
                        $project: {
                            _id:0,
                            cantidad: 1,
                            items: { "$arrayElemAt": ["$items", 0] }
                        }
                    }
                ]);
                console.log(almacenItemsResult)
            return almacenItemsResult;
        } catch (error) {
            console.log(error)
            return almacenItemsResult;
        }
    }
    async getByAlmacenItems(items: IItems): Promise<Array<IAlmacenItem>> {
        /* this.items = items;
        let almacenItemsResult: Array<IAlmacenItem> = []
        console.log(this.items._id+" .. "+this.almacen._id)
        try {
            almacenItemsResult = await AlmacenItem
                .aggregate([
                    {
                        $match: {
                            almacen: Types.ObjectId(this.almacen._id.toString()) ,                            
                        }
                    },
                    {
                        $match: {
                            items: Types.ObjectId(this.items._id.toString()), 
                        }
                    },
                    {

                        $group: {
                            _id: {
                                items: '$items',
                            },
                            cantidad: { $sum: '$cantidad' }
                        }
                    },
                    {
                        $lookup:
                        {
                            from: "items",
                            localField: "_id.items",
                            foreignField: "_id",
                            as: "items"
                        }
                    },
                    {
                        $project: {
                            cantidad: 1,
                            items: { "$arrayElemAt": ["$items", 0] }
                        }
                    }

                ]);
                console.log(almacenItemsResult)
            return almacenItemsResult;
        } catch (error) {
            console.log(error)
            return almacenItemsResult;
        } */

        this.items = items;
        let almacenItemResult: Array<IAlmacenItem> = await AlmacenItem.find({ almacen: this.almacen, items: this.items._id, cantidad: { $ne: 0 }, activo: true }).sort({ 'createdAt': -1 })
            .populate("almacen")
            .populate("lote")
            .populate("items").exec();
        return almacenItemResult;
    }
}