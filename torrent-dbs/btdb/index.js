const scrapeBTDB = require('./scrapeBTDB');
const sort = require('../../sort/index');

module.exports = function (options) {

    scrapeBTDB(options.query, options.page)
        .then((results) => {

            if (results.length < 1) {
                console.log('No results found @ TPB');
            }
            else {
                results.forEach(result => {
                    sort(result)
                        .then((album) => {
                            if (!options.array.find(item => {
                                album.link === item.link;
                            })){
                                console.log(album);
                                options.array.push(album);
                            }
                        });
                })

            }
        })
        .catch(e => console.log(e));

};