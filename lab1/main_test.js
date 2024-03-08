const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test('Test MyClass\'s addStudent', () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Test Student");
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0); // 應該正確添加學生並返回索引0

    const invalidStudent = {};
    const invalidIndex = myClass.addStudent(invalidStudent);
    assert.strictEqual(invalidIndex, -1); // 傳入非Student實例應返回-1
});


test('Test Student\'s setName', () => {
    const student = new Student();
    student.setName("Test Student");
    assert.strictEqual(student.name, "Test Student"); // 設置的名字應該符合預期

    student.setName(123); // 傳入非字符串應不修改名字
    assert.strictEqual(student.name, "Test Student"); // 名字應該保持不變
});



test('Test Student\'s getName', () => {
    const student = new Student();
    assert.strictEqual(student.getName(), ''); // 應該返回空字符串，因為名字未設置

    student.setName("Test Student");
    assert.strictEqual(student.getName(), "Test Student"); // 設置名字後應該返回設置的名字
});
