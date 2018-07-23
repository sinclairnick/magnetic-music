const tpb = require('thepiratebay');
const sort = require('../../sort/index');

module.exports = function search (options) {

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
                results.forEach(result => {
                    sort(result)
                        .then((album) => {
                            if (!options.array.find(item => {
                                album.link === item.link;
                            })) {
                                options.array.push(album);
                            }
                        });
                })

            }
        })
        .catch(e => console.log(e));


}