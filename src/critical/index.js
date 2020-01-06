import { middleFunction } from "./middle"

function testTypeIssue11() {
    // middleFunction()
    throw new Error("testTypeIssue11 was thrown");
}

// file path is different than buyItem's file path
function theCriticalIssue() {
    throw new Error("from /src/critical/index.js, needs Heroes!");
}


export { testTypeIssue11, theCriticalIssue }