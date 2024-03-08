const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("John Doe");
    
    // 測試添加學生是否成功
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0, "Should return the index of the added student");

    // 測試添加非Student實例
    const nonStudent = { name: "Fake Student" };
    const nonStudentIndex = myClass.addStudent(nonStudent);
    assert.strictEqual(nonStudentIndex, -1, "Should return -1 for non-Student instances");
});

test("Test MyClass's getStudentById", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Jane Doe");
    myClass.addStudent(student);
    
    // 測試通過有效ID獲取學生
    const fetchedStudent = myClass.getStudentById(0);
    assert.strictEqual(fetchedStudent.getName(), "Jane Doe", "Should fetch the correct student by ID");

    // 測試使用無效ID獲取學生
    const invalidStudent = myClass.getStudentById(-1);
    assert.strictEqual(invalidStudent, null, "Should return null for invalid IDs");
});

test("Test Student's setName and getName", async (t) => {
    const student = new Student();
    student.setName("John Smith");
    assert.strictEqual(student.getName(), "John Smith", "setName and getName should correctly set and return the student's name");

    student.setName(12345); // 嘗試使用非字符串設置名字
    assert.notStrictEqual(student.getName(), 12345, "setName should not accept non-string values");
});
