"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const btdb_search_1 = require("./btdb-search");
/**
 * @param {string} query
 * @param {number} page
 */
exports.default = (query, page = 1) => new Promise((resolve, reject) => {
    searchBTDB(query, page)
        .then(res => resolve(res))
        .then(err => reject(err));
});
const searchBTDB = (query, page) => new Promise((resolve, reject) => {
    btdb_search_1.default(query, page)
        .then((res) => res.length > 0 ? resolve(res) : reject('No results were found [tpb]'))
        .catch(err => reject(err));
});
