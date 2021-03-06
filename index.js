"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tpb_1 = require("./src/scrape/tpb");
const btdb_1 = require("./src/scrape/btdb");
const sort_1 = require("./src/sort");
const DB = [
    tpb_1.default,
    btdb_1.default
];
exports.default = (query, { page = 0, array = [] } = {}) => new Promise((resolve, reject) => {
    const proms = DB.map(fn => fn(query, page).catch(e => reject(e)));
    Promise.all(proms)
        .then((searchRes) => joinDBResults(searchRes))
        .then(results => sortIntoAlbums(results, array))
        .then(arr => filterAndReturn(arr, resolve, reject))
        .catch(e => reject(e));
});
const joinDBResults = (res) => res.reduce((results, result) => [...results, ...result], []);
const sortIntoAlbums = (results, array) => results.map(album => sort_1.default(album, array).then(res => res).catch(e => null));
const filterAndReturn = (arr, resolve, reject) => Promise.all(arr).then(res => resolve(res.filter(album => album))).catch(e => reject(e));
//    ^^^^^^ Removes any undefined (rejected) promises
