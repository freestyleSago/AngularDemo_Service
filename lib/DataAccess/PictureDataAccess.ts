import { Picture } from "../Models/Picture";
import { Mongoose, SchemaDefinition, Schema } from "mongoose";
import { DataAccessBase } from "./DataAccessBase";
import { each } from "async";

export class PictureDataAccessAsync extends DataAccessBase<Picture>{
    constructor() {
        super();
        let schemaDefinition = {
            name: String,
            description: String,
            path: String,
            favorite: Number,
        };
        super.Init(schemaDefinition, "Pictures");
    };

    public async GetPicturesAsync(): Promise<Picture[]> {
        return super.GetItemsAsync();
    }

    public async GetPictureAsync(id: string): Promise<Picture> {
        return super.GetItemAsync(id);
    }

    public async UpdatePictureByIDAsync(picture: Picture): Promise<Picture> {
        return super.UpdateItemAsync({ _id: picture._id }, picture);
    }

    public async AddPictureAsync(picture: Picture): Promise<Picture> {
        return super.AddItemAsync(picture);
    }

    public async RemovePictureAsync(id: string): Promise<boolean> {
        return super.RemoveItemAsync({ _id: id });
    }
}