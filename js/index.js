"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tpb_1 = require("./src/scrape/tpb");
const btdb_1 = require("./src/scrape/btdb");
const sort_1 = require("./src/sort");
const DB = [
    tpb_1.default,
    btdb_1.default
];
const timeoutLength = () => 15000;
exports.default = (query, { page = 0, array = [] } = {}) => new Promise((resolve, reject) => {
    const proms = DB.map(fn => fn(query, page));
    Promise.all(proms)
        .then((searchRes) => joinDBResults(searchRes))
        .then(results => sortIntoAlbums(results))
        .then(arr => {
        Promise.all(arr).then(res => resolve(res));
        setTimeout(() => resolve(arr.filter(item => !(item instanceof Promise))), timeoutLength);
    })
        .catch(e => reject(e));
});
const joinDBResults = (res) => res.reduce((results, result) => [...results, ...result], []);
const sortIntoAlbums = (results) => results.map((result, index) => Promise.resolve(sort_1.default(result).catch(e => console.warn(e))));
