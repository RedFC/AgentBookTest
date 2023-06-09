#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config()
var app = require("../app")
import http from 'http';
import moment from 'moment';
import fs from 'fs';
import { Spinner } from 'cli-spinner';
import mongoose from 'mongoose'
import {Seeder} from '../app/seeder/seeder'
let seeder = new Seeder();
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
    Promise.all([mongodbconnect(),seeder.main()]).then(() => {
        console.info(`✔️ Server Started (listening on PORT : ${port})`);
        console.info(`⌚`, moment().format("DD-MM-YYYY hh:mm:ss a"));
    }).catch(err => {
        console.info(`ERRR`, err);
    })
    
});

// connecting mongodb database
async function mongodbconnect() {
    try {
        
        await mongoose.connect(process.env.mongoURL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            autoIndex: true,
        });
        console.info("✔️ MongoDb Database Safely Connected DB URL => "+process.env.mongoURL);

    } catch (error) {
        console.info(`⌚`, moment().format("DD-MM-YYYY hh:mm:ss a"));
        console.error("❗️ Could not connect to mongodb database...", error);
        server.close();
        process.exit();
    }
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
            fs.appendFileSync("access.log", err.message);
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
    fs.appendFile("access.log", `Uncaught Exception: ${err.message}`, () => { });
    console.log(`Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (reason, promise) => {
    fs.appendFile(
        "access.log",
        `Unhandled rejection, reason: ${reason}`,
        () => { }
    );
    console.log("Unhandled rejection at", promise, `reason: ${reason}`);
});
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));