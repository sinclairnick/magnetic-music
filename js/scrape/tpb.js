"use strict";
exports.__esModule = true;
var thepiratebay_1 = require("thepiratebay");
/**
 * @param {string} query
 * @param {number} page
 */
exports["default"] = (function (query, page) {
    if (page === void 0) { page = 0; }
    return new Promise(function (resolve, reject) {
        if (page === 1)
            page--;
        searchTPB(query, page)
            .then(function (res) { return resolve(res); })["catch"](function (err) { return reject(err); });
    });
});
var searchTPB = function (query, page) { return new Promise(function (resolve, reject) {
    thepiratebay_1.search(query, { category: 'audio', page: page })
        .then(function (res) { return res.length > 0 ? resolve(res) : reject('No results were found [tpb]'); })["catch"](function (err) { return reject(err); });
}); };
