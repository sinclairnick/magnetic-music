import * as assert from 'assert';
import Album from '../src/Album';
import magMusic from '../index';
import * as deepEqual from 'deep-equal';

describe('magMusic()', () => {

  let array = [];
  let page1;
  let page2;

  before((done) => {
    magMusic('Frank Ocean', { array, page: 1 }).then(res => {
      console.log(res);
      page1 = res;
      done();
    });
    page2 = magMusic('Frank Ocean', { page: 2 }).then(res => { page2 = res });
  })

  it('returns an array', () => {
    assert(page1 instanceof Array);
  })

  it('returns only Album objects', () => {
    assert(page1.every(result => result instanceof Album))
  })

  it('returns different results based on the page', () => {
    assert(!deepEqual(page1, page2))
  })

})

describe('magMusic() before resolved', () => {

  let array = [];

  before((done) => {
    magMusic('Frank Ocean', { array });
    setTimeout(() => done(), 5000);
  })

  it('pushes Albums to the provided array', () => {
    assert(array.length > 1 && array.every(item => item instanceof Album))
  })

})