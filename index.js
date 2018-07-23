//exports the search function

const searchBTDB = require('./torrent-dbs/btdb/index');
const searchTPB = require('./torrent-dbs/tpb/index');

module.exports = function (options) {

    if(typeof options === 'object'){

        if (options.array) {
            if (!Array.isArray(options.array)) {
                throw new Error('Options.array is not an array object');
            }
        }
        else{
            throw new Error('No array provided');
        }
    
        //defaulting options object
        options.page = options.page || 1;
    
        searchBTDB(options);
        searchTPB(options);
    }
    else{
        throw new Error('No options object provided');
    }
}