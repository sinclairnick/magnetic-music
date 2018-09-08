const { search } = require('thepiratebay');

/**
 * @param {string} query
 * @param {number} page
 */
export default (query: string, p = 1) => new Promise((resolve, reject) => {
  const page = p > -1 && p--;
  searchTPB(query, page)
    .then(res => resolve(res))
    .catch(err => reject(err));

})

const searchTPB = (query, page): Promise<any> => new Promise((resolve, reject) => {
  search(query, { category: 'audio', page })
    .then((res: []) => {
      res.length > 0 ? resolve(res) : reject('No results were found [tpb]');
      setTimeout(() => resolve(null), 15000)
    })
    .catch(err => reject(err))
});