import { IController } from "../Interface/IController";
import { Server } from "restify";
import { PictureDataAccessAsync } from "../DataAccess/PictureDataAccess";
import { Picture } from "../Models/Picture";

export class PictureController implements IController {

    constructor(httpContext: Server) {
        this.HttpContext = httpContext;
        this.dataAccess = new PictureDataAccessAsync();
    }

    HttpContext: Server;
    dataAccess: PictureDataAccessAsync;

    async GetPicturesAsync(): Promise<Picture[]> {
        return this.dataAccess.GetPicturesAsync();
    }

    public async GetPictureAsync(id: string): Promise<Picture> {
        return this.dataAccess.GetPictureAsync(id);
    }

    public async UpdatePictureByIDAsync(picture: Picture): Promise<Picture> {
        return this.dataAccess.UpdatePictureByIDAsync(picture);
    }

    public async AddPictureAsync(picture: Picture | any): Promise<Picture> {
        return this.dataAccess.AddPictureAsync(picture);
    }

    public async RemovePictureAsync(id: string): Promise<boolean> {
        return this.dataAccess.RemovePictureAsync(id);
    }

    public async SavePictureToLocalAsync(file: any): Promise<Picture> {
        return new Promise<Picture>((resolve, reject) => {
            let fs: any = require("fs");
            let path: string = `${process.cwd()}/images/${file.name}`;
            let dirPath: string = `${process.cwd()}/images`;
            console.log(path);

            // 这种回调方式真的是操蛋，又没有GoTo语法。又不想在封装一个函数。导致fs.rename只能写两次了。
            fs.exists(dirPath, (exists: boolean) => {
                if (!exists) {
                    fs.mkdir(dirPath, (err: Error) => {
                        if (err) {
                            console.log(err.message);
                            throw err;
                        }
                        fs.rename(file.path, path, async (err: Error) => {
                            if (err) {
                                reject();
                                console.log(err.message);
                                return;
                            }
                            // 删除临时文件夹文件
                            // fs.unlink(file.path,(err:Error)=>{
                            //     if(err){
                            //         console.log(err.message);
                            //         throw err;
                            //     }
                            // });
                            let picture: any = { name: file.name, description: "默认描述", path: path, favorite: 0 };
                            let returnValue: Picture = await this.AddPictureAsync(picture);
                            console.log("返回啦");
                            resolve(returnValue);
                        });
                    });
                } else {
                    fs.rename(file.path, path, async (err: Error) => {
                        if (err) {
                            reject();
                            console.log(err.message);
                            return;
                        }
                        // 删除临时文件夹文件
                        // fs.unlink(file.path,(err:Error)=>{
                        //     if(err){
                        //         console.log(err.message);
                        //         throw err;
                        //     }
                        // });
                        let picture: any = { name: file.name, description: "默认描述", path: path, favorite: 0 };
                        let returnValue: Picture = await this.AddPictureAsync(picture);
                        console.log("返回啦");
                        resolve(returnValue);
                    });
                }
            });
        });
    }

    public async GetImageAsync(id: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            let fs: any = require("fs");
            let picture: Picture = await this.GetPictureAsync(id);
            if (!picture) {
                reject();
                console.log("没找到图片");
                return;
            }
            fs.readFile(picture.path, (err: Error, data: any) => {
                if (err) {
                    throw err;
                }
                resolve(data);
            });
        });
    }
}