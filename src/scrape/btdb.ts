import search from './btdb-search';

/**
 * @param {string} query
 * @param {number} page
 */
export default (query: string, page = 1) => new Promise((resolve, reject) => {

  searchBTDB(query, page)
    .then(res => resolve(res))
    .then(err => reject(err));

})

const searchBTDB = (query, page): Promise<any> => new Promise((resolve, reject) => {
  search(query, page)
    .then((res: []) => res.length > 0 ? resolve(res) : reject('No results were found [tpb]'))
    .catch(err => reject(err))
})