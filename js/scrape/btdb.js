"use strict";
exports.__esModule = true;
var btdb_search_1 = require("./btdb-search");
/**
 * @param {string} query
 * @param {number} page
 */
exports["default"] = (function (query, page) {
    if (page === void 0) { page = 1; }
    return new Promise(function (resolve, reject) {
        searchBTDB(query, page)
            .then(function (res) { return resolve(res); })
            .then(function (err) { return reject(err); });
    });
});
var searchBTDB = function (query, page) { return new Promise(function (resolve, reject) {
    btdb_search_1["default"](query, page)
        .then(function (res) { return res.length > 0 ? resolve(res) : reject('No results were found [tpb]'); })["catch"](function (err) { return reject(err); });
}); };
