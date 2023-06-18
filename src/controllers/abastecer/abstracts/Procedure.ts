import { Document } from "mongoose";
export abstract class Procedure{
    abstract validate():boolean;
    abstract async exec():Promise<void>;
    abstract getDocument():Document|null;
    abstract getMessage():string|null;
}