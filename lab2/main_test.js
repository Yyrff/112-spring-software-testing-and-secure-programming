const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'Thank\nyou\n9527');
});
const { Application, MailSystem } = require('./main');

test('Test MailSystem : write()', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('Thank'), 'Congrats, Thank!');
    assert.strictEqual(ms.write(null), 'Congrats, null!');
    assert.strictEqual(ms.write(48763), 'Congrats, 48763!');
});

test('Test MailSystem : send()', () => {
    const ms = new MailSystem();
    const name = 'Thank';
    test.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(ms.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(ms.send(name, 'fail'), false);
});

test('Test Application : getNames()', async () => {
    const app = new Application();
    const name_list = ['Thank', 'you', '9527'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [name_list, []])
});

test('Test Application : getRandomPerson()', async (test) => {
    const app = new Application();
    const names = await app.getNames();
    test.mock.method(Math, 'random', () => 0);
    assert.strictEqual(app.getRandomPerson(), 'Thank');
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(app.getRandomPerson(), 'you');
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(app.getRandomPerson(), '9527');
});

test('Test Application : selectNextPerson()', async (test) => {
    const app = new Application();
    const names = await app.getNames();
    app.selected = ['Thank'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= names.length) { 
            return names[0][cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'you');
    assert.deepStrictEqual(app.selected, ['Thank', 'you']);
    assert.strictEqual(app.selectNextPerson(), '9527');
    assert.deepStrictEqual(app.selected, ['Thank', 'you', '9527']);
    assert.strictEqual(app.selectNextPerson(), null);
});

test('Test Application : notifySelected()', async (test) => {
    const app = new Application();
    app.people = ['Thank', 'you', '9527'];
    app.selected = ['Thank', 'you', '9527'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
});
