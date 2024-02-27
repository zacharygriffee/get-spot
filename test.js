import {test, solo} from "brittle";
import {getSpot} from "./index.js";

///////////// Put all tests below other tests as their position in code
///////////// is important for the tests.

test("get spot in code", t => {
    const {line, column, file, callee} = getSpot()[0]; // <-- this needs to stay right here for test.
    t.is(line, 8);
    t.is(column, 42);
    t.ok(file.endsWith("test.js"), "provides the absolute file path");
    t.is(callee, "", "anonymous functions (in this stack the test's anon func)) does not have a callee");
});

test("get spot nested in function", t => {
    let line, column, file, callee;
    //////////// leave line /////////////
    exec();
    t.is(line, 25);
    t.is(column, 41);
    t.ok(file.endsWith("test.js"));
    t.is(callee, "exec");
    //////////// leave line /////////////
    function exec() {
        ({line, column, file, callee} = getSpot()[0]);
    }
});

test("get previous function invocation from 'getSpot'", t => {
    function someFunction() {
        let line, column, file, callee;
        function exec() {
            ({line, column, file, callee} = getSpot(2)[0]);
        }
        exec();
        t.is(line, 35);
        t.is(column, 9);
        t.ok(file.endsWith("test.js"));
        t.is(callee, "someFunction", "the function is named");
    }
    someFunction();
});

test("invalid input, offset defaults to 1", t => {
    function someFunction(offset) {
        const [{line, column}] = getSpot(offset);

        t.is(line + ":" + column, "46:34", `offset ${offset} is the same as the others in this test.`);
    }

    for (const x of ["hello", 0, 1, -1, undefined, null]) {
        someFunction(x);
    }
});

test("Get spot from actual error", t => {
    const e = new Error();
    const {line, column, file, callee} = getSpot(e);
    t.is(line, 57);
    t.is(column, 15);
    t.ok(file.endsWith("test.js"));
    t.is(callee, "", "");
})