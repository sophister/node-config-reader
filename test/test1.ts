import assert from 'assert';
import envLoad from '../src/index';

const finalConfig = envLoad({
    configDir: __dirname,
    defaultEvn: 'default',
    currentEnv: 'dev'
});

console.log(finalConfig);

assert.equal(finalConfig.name, 'aa', 'old property should exist');
assert.equal(finalConfig.from, 'dev', 'same property should override');
assert.equal(finalConfig.another.test, 'test-11', 'new property should add');

assert.equal(finalConfig.deep.e.test, 'e', 'deep old property should exist');
assert.equal(finalConfig.deep.a, 'str', 'deep same property should override');
assert.equal(finalConfig.deep.e.hehehe, true, 'deep new property should add');

