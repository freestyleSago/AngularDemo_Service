import { PictureController } from "../Controllers/PictureController";
import { Server, Next } from "restify";
import { encode } from "punycode";

export class PictureManagerRouter implements IRouter {

    constructor(httpContext: Server) {
        this.HttpContext = httpContext;
        this.PictureController = new PictureController(this.HttpContext);
        this.Init();
    }

    PictureController: PictureController;
    HttpContext: Server;

    Init(): void {
        let pictureController = this.PictureController;

        this.HttpContext.get("/api", async (req, res, next) => {
            res.send(await pictureController.GetPicturesAsync());
            next();
        });

        this.HttpContext.get("/api/:id", async (req, res, next) => {
            res.send(await pictureController.GetPictureAsync(req.params.id));
            next();
        });

        this.HttpContext.opts("api/put", (req, res, next) => {
            res.header("Access-Control-Allow-Methods", "PUT");
            res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");
            res.end();
            next();
        });

        this.HttpContext.put("api/put", async (req, res, next) => {
            res.send(await pictureController.UpdatePictureByIDAsync(req.body));
            next();
        });

        this.HttpContext.post("/api/add", async (req, res, next) => {
            res.send(await pictureController.AddPictureAsync(req.body));
            next();
        });

        this.HttpContext.opts("api/del/:id", (req, res, next) => {
            res.header("Access-Control-Allow-Methods", "DELETE");
            res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");
            res.end();
            next();
        });

        this.HttpContext.del("/api/del/:id", async (req, res, next) => {
            res.send(await pictureController.RemovePictureAsync(req.params.id) + "");
            next();
        });

        // 跨域复杂请求类型时，会先向服务器发送一个预请求，以求告诉客户端此服务可以接收哪些类型的请求。
        this.HttpContext.opts("/api/upload", (req, res, next) => {
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");
            res.end();
            next();
        });

        this.HttpContext.post("/api/upload", async (req, res, next) => {
            if (req.files == null || req.files == undefined) return;

            let fileName = req.body.filename;
            let file = req.files.file;
            res.send(await pictureController.SavePictureToLocalAsync(file));
            next();
        });

        this.HttpContext.get("/api/image/:id", async function (req, res, next) {
            res.header("Content-Type", "image/jpeg");
            let fileName = req.params.id;
            if (req.query.filename)
                fileName = req.query.filename
            res.header("Content-Disposition", `attachment;filename=${encodeURIComponent(fileName)}`);
            res.send(await pictureController.GetImageAsync(req.params.id));
            next();
        });
    }
}