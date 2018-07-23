//exports the search function

const searchBTDB = require('./lib/torrent-dbs/btdb/index');
const searchTPB = require('./lib/torrent-dbs/tpb/index');

module.exports = function (options) {

    return new Promise((resolve, reject) => {

        if (typeof options === 'object') {

            if (options.array) {
                if (!Array.isArray(options.array)) {
                    throw new Error('Options.array is not an array object');
                }
            }

            //defaulting options object
            options.page = options.page || 1;
            options.array = options.array || 1;

            Promise.all([
                searchBTDB(options),
                searchTPB(options)
            ])
                .then(() => {
                    resolve(options.array);
                })

        }
        else {
            throw new Error('No options object provided');
        }
    })

}