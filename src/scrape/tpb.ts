const { search } = require('thepiratebay');

/**
 * @param {string} query
 * @param {number} page
 */
export default (query: string, page = 0) => new Promise((resolve, reject) => {
  if (page === 1) page--;
  searchTPB(query, page)
    .then(res => resolve(res))
    .catch(err => reject(err));

})

const searchTPB = (query, page): Promise<any> => new Promise((resolve, reject) => {
  search(query, { category: 'audio', page })
    .then((res: []) => res.length > 0 ? resolve(res) : reject('No results were found [tpb]'))
    .catch(err => reject(err))
});