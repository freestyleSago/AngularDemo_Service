import { Appconfig } from "./Appconfig";
import { PictureManagerRouter } from "./Routers/PictureManagerRouter";
export namespace Sago_Framework_Http {
    export class Server {
        constructor() {
            this.Port = Appconfig.port;
            this.Routers = new Array();
        }

        Port: number;
        Routers: IRouter[];

        StartServer(): void {
            let restify = require("restify");
            let server = restify.createServer();

            server.listen(this.Port, function () {
                console.log("%s listening at %s", server.name, server.url);
            });

            server.pre(function (req: any, res: any, next: any) {
                res.header("Access-Control-Allow-Origin", "*");
                
                return next();
            });

            // server.use(restify.plugins.acceptParser(server.acceptParser));  
            server.use(restify.plugins.bodyParser());
            server.use(restify.plugins.queryParser({ mapParams: false }));
            this.InitRouters(server);
        }

        InitRouters(server: any): void {
            this.Routers.push(new PictureManagerRouter(server));
        }
    }
}