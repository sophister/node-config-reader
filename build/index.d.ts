export declare function mergeConfigFiles(confArray: string[]): any;
/**
 * default env config file name resolver
 * @param envName env name, such as 'default', 'production', 'dev'
 */
declare function defaultConfigFileNameResolver(envName: string): string;
export declare type FileNameResolver = typeof defaultConfigFileNameResolver;
interface Args {
    configDir: string;
    defaultEvn?: string;
    currentEnv: string;
    fileNameResolver?: FileNameResolver;
}
/**
 *
 * @param configDir
 * @param currentEnv
 * @param fileNameResolver
 */
export default function loadConfig(args: Args): any;
export {};
