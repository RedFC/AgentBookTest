"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
let jsonFileProvider = require('./provider');
let paths = jsonFileProvider().paths;
let definations = jsonFileProvider().definitions;
let finalPath = {};
let finalDefination = {};
let returnPath = () => {
    paths.forEach((path) => {
        finalPath = Object.assign(Object.assign({}, finalPath), path);
    });
    return finalPath;
};
let returnDefination = () => {
    definations.forEach((defination) => {
        finalDefination = Object.assign(Object.assign({}, finalDefination), defination);
    });
    return finalDefination;
};
function swagger() {
    let FinalPath = returnPath();
    let FinalDefination = returnDefination();
    return { FinalPath, FinalDefination };
}
exports.swagger = swagger;
;
//# sourceMappingURL=swaggermain.js.map