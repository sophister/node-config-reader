# node-config-reader
read and merge config for multiple env support

## Install

```shell
# with npm
npm install node-config-reader
# or using yarn
yarn add node-config-reader
```

## Usage

```typescript
import envLoad from 'node-config-reader';

const finalConfig = envLoad({
    configDir: __dirname,
    defaultEnv: 'default',
    currentEnv: 'dev',
});
```

Function `interface`

```typescript
// function to get file name from env name
type FileNameResolver = (envName: string) => string;

/**
 * default env config file name resolver
 * @param envName env name, such as 'default', 'production', 'dev'
 */
function defaultConfigFileNameResolver(envName: string): string {
    return `config.${envName}`;
}

interface Args {
    // absolute path to config dir
    configDir: string;
    // default env name
    defaultEnv?: string;
    // current env
    currentEnv: string;
    // function to resolve config file name based on env
    fileNameResolver?: FileNameResolver;
}

type EnvLoad<T = any> = (args: Args) => T;

```