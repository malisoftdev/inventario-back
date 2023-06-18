import { Document } from "mongoose";
export abstract class Procedure{
    abstract async validate():Promise<boolean>;
    abstract async exec():Promise<void>;
    abstract getDocument():Document;
    abstract getMessage():string|undefined;
}