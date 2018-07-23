//exports the search function

const searchBTDB = require('./torrent-dbs/btdb/index');
const searchTPB = require('./torrent-dbs/tpb/index');

module.exports = function (query, options = {}) {

    searchBTDB(query, arr, page);
    searchTPB(query, arr, page);

}