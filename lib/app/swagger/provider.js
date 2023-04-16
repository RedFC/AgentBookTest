"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let main_dir = path_1.default.join(__dirname);
const folders = fs_1.default.readdirSync(main_dir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
let definitions = [];
let paths = [];
let returnJsons = () => {
    folders.forEach(folder => {
        fs_1.default.readdirSync(main_dir + "/" + folder)
            .filter(file => file)
            .map(e => {
            if (fs_1.default.existsSync(main_dir + "/" + folder)) {
                let way = main_dir + "/" + folder + '/' + e;
                if (e == "definitions.json") {
                    definitions.push(require(way));
                }
                else if (e == "paths.json") {
                    paths.push(require(way));
                }
            }
            ;
        });
    });
    return { definitions, paths };
};
module.exports = returnJsons;
//# sourceMappingURL=provider.js.map