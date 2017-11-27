import { Appconfig } from "../Appconfig";
import { Mongoose, Schema, Document, Model, MongooseDocument, Error } from "mongoose";
import { Picture } from "../Models/Picture";

export class DataAccessBase<T extends Document>{
    constructor() {
        let mongoose = require('mongoose');
        let dbPath = Appconfig.dbpath;
        mongoose.connect(`mongodb://${dbPath}`, { useMongoClient: true });
        mongoose.Promise = global.Promise;

        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("数据库已连接");
        });
        this.DataBase = mongoose;
    }

    protected DataBase: Mongoose;
    protected Schema: Schema;
    protected Model: Model<T>;

    protected Init(schemaDefinition: any, conllectionName: string): void {
        this.Schema = new this.DataBase.Schema(schemaDefinition);
        this.Model = this.DataBase.model<T>(conllectionName, this.Schema, conllectionName);
    }

    protected async GetItemsAsync(): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            this.Model.find({}, (err, res) => {
                if (err) {
                    console.log(err);
                    resolve(undefined);
                } else {
                    console.log(res);
                    resolve(res);
                }
            });
        });
    }

    protected async GetItemAsync(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.Model.findOne({ _id: id }, (err, res) => {
                if (err) {
                    console.log(err);
                    resolve(undefined);
                } else {
                    console.log(res);
                    if (res == null) {
                        resolve(undefined);
                    } else {
                        resolve(res);
                    }
                }
            });
        });
    }

    protected async UpdateItemAsync(condition: object, item: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.Model.update(condition, item, {}, (err: Error, raw: any) => {
                if (err) {
                    reject();
                    throw err;
                }
                resolve(raw);
            });
        });
    }

    protected async AddItemAsync(item: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.Model.create(item, (err: any, res: (T | null | undefined)) => {
                if (err) {
                    console.log(err);
                    resolve(undefined);
                } else {
                    console.log(res);
                    if (res == null) {
                        resolve(undefined);
                    } else {
                        console.log("添加成功啦");
                        resolve(res);
                    }
                }
            });
        });
    }

    protected async RemoveItemAsync(condition: Object): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Model.remove(condition, err => {
                if (err) {
                    console.log(err);
                    reject(false);
                } else {
                    console.log("true");
                    resolve(true);
                }
            });
        });
    }
}