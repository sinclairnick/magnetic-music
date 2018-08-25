"use strict";
exports.__esModule = true;
var request = require('request');
var cheerio = require('cheerio');
exports["default"] = (function (query, page) {
    if (page === void 0) { page = 1; }
    return new Promise(function (resolve, reject) {
        var result = [];
        var option = { url: "https://btdb.to/q/" + encodeURIComponent(query) + "/" + page + "?sort=popular" };
        request(option, function (err, res, html) {
            if (err)
                reject(err);
            var $ = cheerio.load(html);
            var elems = $('li[class=search-ret-item]');
            if (!elems)
                reject('Found no BTDB results.');
            elems.each(function (index, element) {
                var magnet = $(element).find('a.magnet').attr('href');
                var name = $(element).find('.item-title a').attr('title');
                var size = $(element).find('.item-meta-info-value').eq(0).text();
                var popularity = Math.floor($(element).find('.item-meta-info-value').eq(3).text() / 1000);
                result.push({ magnet: magnet, name: name, size: size, popularity: popularity });
                if (elems.length - 1 === index)
                    resolve(result);
            });
        });
    });
});
