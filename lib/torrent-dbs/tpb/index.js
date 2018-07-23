const tpb = require('thepiratebay');
const sort = require('../../sort/index');

module.exports = function search (options) {

    return new Promise((resolve, reject) => {

        //tpb's page 1 = page 0
        options.page--;

        tpb.search(options.query, {
            category: 'audio',
            page: options.page
        })
            .then(results => {

                if (results.length < 1) {
                    console.log('No results found @ TPB');
                }
                else {
                    let iterated = 0;
                    results.forEach(result => {
                        sort(result)
                            .then((album) => {
                                iterated++;
                                if (!options.array.find(item => {
                                    album.link === item.link;
                                })) {
                                    options.array.push(album);
                                }
                                if (iterated === results.length - 1) {
                                    resolve(true);
                                }
                            });
                    })

                }
            })
            .catch(e => reject(e));

    })



}