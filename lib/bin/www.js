#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
require('dotenv').config();
var app = require("../app");
const http_1 = __importDefault(require("http"));
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const seeder_1 = require("../app/seeder/seeder");
let seeder = new seeder_1.Seeder();
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
/**
 * Create HTTP server.
 */
var server = http_1.default.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
    Promise.all([mongodbconnect(), seeder.main()]).then(() => {
        console.info(`✔️ Server Started (listening on PORT : ${port})`);
        console.info(`⌚`, moment_1.default().format("DD-MM-YYYY hh:mm:ss a"));
    }).catch(err => {
        console.info(`ERRR`, err);
    });
});
// connecting mongodb database
function mongodbconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.mongoURL, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                autoIndex: true,
            });
            console.info("✔️ MongoDb Database Safely Connected DB URL => " + process.env.mongoURL);
        }
        catch (error) {
            console.info(`⌚`, moment_1.default().format("DD-MM-YYYY hh:mm:ss a"));
            console.error("❗️ Could not connect to mongodb database...", error);
            server.close();
            process.exit();
        }
    });
}
// connecting Redis Database
// async function connectRedis() {
//     try {
//         await redis.connect_cache()
//         console.info("✔️ Redis Cache Connected");
//     } catch (err) {
//         console.info(`⌚`, moment().format("DD-MM-YYYY hh:mm:ss a"));
//         console.error("❗️ Could not connect to database...", err);
//         server.close();
//         process.exit();
//     }
// }
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function terminate(server, options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = (code) => {
        options.coredump ? process.abort() : process.exit(code);
    };
    return (code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            // Log error information, use a proper logging library here :)
            fs_1.default.appendFileSync("access.log", err.message);
            console.log(err.message, err.stack);
        }
        // Attempt a graceful shutdown
        // server.close(exit);
        // setTimeout(exit, options.timeout).unref();
    };
}
function exitHandler(options, exitCode) {
    terminate(server, {
        coredump: false,
        timeout: 500,
    });
    console.log('⚠️ Gracefully shutting down');
    server.close();
    process.exit();
}
process.on("uncaughtException", (err) => {
    fs_1.default.appendFile("access.log", `Uncaught Exception: ${err.message}`, () => { });
    console.log(`Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (reason, promise) => {
    fs_1.default.appendFile("access.log", `Unhandled rejection, reason: ${reason}`, () => { });
    console.log("Unhandled rejection at", promise, `reason: ${reason}`);
});
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
//# sourceMappingURL=www.js.map