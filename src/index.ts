/**
 * 
 */
import path from 'path';
import _ from 'lodash';

/**
 * do NOT merge array
 * @param objValue
 * @param srcValue
 * @returns {*}
 */
function mergeHandle(objValue: any, srcValue: any) {
    if (_.isArray(srcValue)) {
        return srcValue;
    }
}

export function mergeConfigFiles(confArray: string[]): any {
    let out = {};

    confArray.forEach((file) => {
        let conf = require(file);
        _.mergeWith(out, conf, mergeHandle);
    });

    return out;
}

/**
 * default env config file name resolver
 * @param envName env name, such as 'default', 'production', 'dev'
 */
function defaultConfigFileNameResolver(envName: string): string {
    return `config.${envName}.js`;
}

export type FileNameResolver = typeof defaultConfigFileNameResolver;

interface Args {
    // absolute path to config dir
    configDir: string;
    // default env name
    defaultEvn?: string;
    // current env
    currentEnv: string;
    // function to resolve config file name based on env
    fileNameResolver?: FileNameResolver;
}

/**
 * 
 * @param configDir 
 * @param currentEnv 
 * @param fileNameResolver 
 */
export default function loadConfig(args: Args) {
    const envNames = [];
    if (args.defaultEvn) {
        envNames.push(args.defaultEvn);
    }
    if (args.currentEnv && args.currentEnv !== args.defaultEvn) {
        envNames.push(args.currentEnv);
    }
    const fileNameResolver = args.fileNameResolver || defaultConfigFileNameResolver;
    const configFileList = envNames.map(function (name: string) {
        return path.join(args.configDir, path.sep, fileNameResolver(name));
    });
    return mergeConfigFiles(configFileList);
}
