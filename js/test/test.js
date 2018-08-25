"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../index");
const Album_1 = require("../src/Album");
require("mocha");
describe('Results', function () {
    this.timeout(30000);
    let results;
    before((done) => {
        index_1.default('frank ocean').then(res => { console.log(results); results = res; done(); }).catch(err => console.log(err));
    });
    describe('Array', () => {
        it('should return an array ', () => {
            chai_1.assert.typeOf(results, 'array');
        });
        it('should contain only Album objects', () => {
            results.forEach(result => chai_1.assert.instanceOf(result, Album_1.default, 'Result is instance of Album'));
        });
        describe('Album', () => {
            it('should contain songs of type Song', () => {
                results.forEach(album => album.songs.forEach(song => chai_1.assert.instanceOf(song, Album_1.Song, 'song is instance of Song')));
            });
        });
    });
});
