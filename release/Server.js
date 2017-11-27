"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Appconfig_1 = require("./Appconfig");
var PictureManagerRouter_1 = require("./Routers/PictureManagerRouter");
var Sago_Framework_Http;
(function (Sago_Framework_Http) {
    var Server = /** @class */ (function () {
        function Server() {
            this.Port = Appconfig_1.Appconfig.port;
            this.Routers = new Array();
        }
        Server.prototype.StartServer = function () {
            var restify = require("restify");
            var server = restify.createServer();
            server.listen(this.Port, function () {
                console.log("%s listening at %s", server.name, server.url);
            });
            server.pre(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                return next();
            });
            // server.use(restify.plugins.acceptParser(server.acceptParser));  
            server.use(restify.plugins.bodyParser());
            server.use(restify.plugins.queryParser({ mapParams: false }));
            this.InitRouters(server);
        };
        Server.prototype.InitRouters = function (server) {
            this.Routers.push(new PictureManagerRouter_1.PictureManagerRouter(server));
        };
        return Server;
    }());
    Sago_Framework_Http.Server = Server;
})(Sago_Framework_Http = exports.Sago_Framework_Http || (exports.Sago_Framework_Http = {}));
