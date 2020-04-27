"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var path_1 = __importDefault(require("path"));
var lodash_1 = __importDefault(require("lodash"));
/**
 * do NOT merge array
 * @param objValue
 * @param srcValue
 * @returns {*}
 */
function mergeHandle(objValue, srcValue) {
    if (lodash_1.default.isArray(srcValue)) {
        return srcValue;
    }
}
function mergeConfigFiles(confArray) {
    var out = {};
    confArray.forEach(function (file) {
        var conf = require(file);
        lodash_1.default.mergeWith(out, conf, mergeHandle);
    });
    return out;
}
exports.mergeConfigFiles = mergeConfigFiles;
/**
 * default env config file name resolver
 * @param envName env name, such as 'default', 'production', 'dev'
 */
function defaultConfigFileNameResolver(envName) {
    return "config." + envName;
}
/**
 *
 * @param configDir
 * @param currentEnv
 * @param fileNameResolver
 */
function loadConfig(args) {
    var envNames = [];
    if (args.defaultEnv) {
        envNames.push(args.defaultEnv);
    }
    if (args.currentEnv && args.currentEnv !== args.defaultEnv) {
        envNames.push(args.currentEnv);
    }
    var fileNameResolver = args.fileNameResolver || defaultConfigFileNameResolver;
    var configFileList = envNames.map(function (name) {
        return path_1.default.join(args.configDir, path_1.default.sep, fileNameResolver(name));
    });
    return mergeConfigFiles(configFileList);
}
exports.default = loadConfig;
