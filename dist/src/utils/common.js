"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliceIntoChunks = void 0;
// Breaks an array into slices, each having a max length of chunkSize
// and returns an array of sliced arrays. Examples:
// ( [1, 2, 3, 4],    2 ) -> [ [1, 2], [3, 4] ]
// ( [1, 2, 3, 4, 5], 2 ) -> [ [1, 2], [3, 4], [5] ]
function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
exports.sliceIntoChunks = sliceIntoChunks;
