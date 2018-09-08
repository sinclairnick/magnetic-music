import searchTPB from './src/scrape/tpb';
import searchBTDB from './src/scrape/btdb';
import sort from './src/sort';
import Album from './src/Album';
import { rejects } from 'assert';

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
    .then(arr => filterAndReturn(arr, resolve, reject))
    .catch(e => reject(e))
})

const joinDBResults = (res) => res.reduce((results: [], result: []) => [...results, ...result], []);
const sortIntoAlbums = (results, array) => results.map(album => sort(album, array).then(res => res).catch(e => null));
const filterAndReturn = (arr, resolve, reject) => Promise.all(arr).then(res => resolve(res.filter(album => album))).catch(e => reject(e));
//    ^^^^^^ Removes any undefined (rejected) promises
