"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const user_routers_1 = require("./routes/user.routers");
const mongoose = require("mongoose");
const cors = require("cors");
const config_1 = require("./enviroments/config");
class App {
    constructor() {
        this.route = new user_routers_1.Routes();
        this.app = express();
        this.app.use(cors());
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json({ limit: '50mb' }));
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config_1.dbInfo.localMongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map