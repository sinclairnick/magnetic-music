import searchTPB from './src/scrape/tpb';
import searchBTDB from './src/scrape/btdb';
import sort from './src/sort';

const DB = [
  searchTPB,
  searchBTDB
]

interface Options {
  page?: number;
  array?: any[];
}

export default (query: string, { page = 0, array = [] }: Options = {}) => new Promise((resolve, reject) => {

  const proms = DB.map(fn => fn(query, page));
  Promise.all(proms)
    .then((searchRes: []) => joinDBResults(searchRes))
    .then(results => sortIntoAlbums(results, array))
    .then(arr => filterAndReturn(arr, resolve))
    .catch(e => reject(e))
})

const joinDBResults = (res) => res.reduce((results: [], result: []) => [...results, ...result], []);
const sortIntoAlbums = (results, array) => results.map(result => sort(result).catch(e => console.warn(e)))
const filterAndReturn = (arr, resolve) => Promise.all(arr).then(res => resolve(res.filter(album => album))).catch(e => console.log(e));
//    ^^^^^^ removes any undefined (rejected) promises