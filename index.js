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
            options.array = options.array || [];

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

        //timeout and resolve array if any albums were found, or reject, after 15 seconds
        //protects against infinitely waiting for low-seed torrents
        setTimeout(()=> {
            if(options.array.length > 0){
                console.warn('magnetic-music timed out. Resolving gathered results (incomplete)')
                resolve(options.array);
            }
            else{
                reject(options.array);
            }
        }, 15000);
    })

}
let arr=[];
module.exports({
    query: 'frank ocean',
    array: arr
})
.then(x => console.log(x));