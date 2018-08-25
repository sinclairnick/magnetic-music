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

const timeoutLength = () => 15000;

export default (query: string, { page = 0, array = [] }: Options = {}) => new Promise((resolve, reject) => {

  const proms = DB.map(fn => fn(query, page));
  Promise.all(proms)
    .then((searchRes: []) => joinDBResults(searchRes))
    .then(results => sortIntoAlbums(results))
    .then(arr => {
      Promise.all(arr).then(res => resolve(res));
      setTimeout(() => resolve(arr.filter(item => !(item instanceof Promise))), timeoutLength)
    })
    .catch(e => reject(e))
})

const joinDBResults = (res) => res.reduce((results: [], result: []) => [...results, ...result], []);
const sortIntoAlbums = (results) => results.map((result, index) => Promise.resolve(sort(result).catch(e => console.warn(e))))