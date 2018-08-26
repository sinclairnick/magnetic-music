import { assert } from 'chai';
import search from '../index';
import Album, { Song } from '../src/Album';
import 'mocha';

describe('Promise returned', function () {
  this.timeout(30000);
  let results;

  before((done) => {
    search('frank ocean').then(res => { results = res; done() }).catch(err => console.log(err));
  })

  // tests are broken: they pass when they shoud not
  describe('Array', () => {
    it('should return an array ', () => {
      assert.typeOf(results, 'array');
    })
    it('should contain only Album objects', () => {
      assert.isTrue(results.every(album => album instanceof Album), 'Array only contains Albums')
    })

  })

  describe('Album', () => {
    it('should contain songs of type Song', () => {
      assert.isTrue(results.every(album => album.songs.every(song => song instanceof Song)))
    })
  })
})

describe('Array provided', function () {
  this.timeout(30000);
  let results = [];

  before((done) => {
    search('frank ocean', { array: results });
    setTimeout(() => done(), 10000);
  })

  it('should iteratively add to the provided array', () => {
    assert.isTrue(results.length > 0);
  })

})