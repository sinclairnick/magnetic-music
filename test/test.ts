import { assert } from 'chai';
import search from '../index';
import Album, { Song } from '../src/Album';
import 'mocha';

describe('Results', function () {
  this.timeout(30000);
  let results;

  before((done) => {
    search('frank ocean').then(res => { console.log(results); results = res; done() }).catch(err => console.log(err));
  })

  describe('Array', () => {
    it('should return an array ', () => {
      assert.typeOf(results, 'array');
    })
    it('should contain only Album objects', () => {
      results.forEach(result => assert.instanceOf(result, Album, 'Result is instance of Album'));
    })

    describe('Album', () => {
      it('should contain songs of type Song', () => {
        results.forEach(album => album.songs.forEach(song => assert.instanceOf(song, Song, 'song is instance of Song')));
      })
    })
  })

})