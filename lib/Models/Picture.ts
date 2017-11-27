import {Document,MongooseDocument} from "mongoose";

export interface Picture extends Document{
    _id:String;
    name:String;
    description:String;
    path:String;
    favorite:Number;
}