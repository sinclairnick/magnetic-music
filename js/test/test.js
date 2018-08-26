"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../index");
const Album_1 = require("../src/Album");
require("mocha");
describe('Promise returned', function () {
    this.timeout(30000);
    let results;
    before((done) => {
        index_1.default('frank ocean').then(res => { results = res; done(); }).catch(err => console.log(err));
    });
    // tests are broken: they pass when they shoud not
    describe('Array', () => {
        it('should return an array ', () => {
            chai_1.assert.typeOf(results, 'array');
        });
        it('should contain only Album objects', () => {
            chai_1.assert.isTrue(results.every(album => album instanceof Album_1.default), 'Array only contains Albums');
        });
    });
    describe('Album', () => {
        it('should contain songs of type Song', () => {
            results.forEach(album => album.songs.forEach(song => chai_1.assert.instanceOf(song, Album_1.Song, 'song is instance of Song')));
        });
    });
});
describe('Array provided', function () {
    this.timeout(30000);
    let results = [];
    before((done) => {
        index_1.default('frank ocean', { array: results });
        setInterval(() => { console.log(results.length); done(); }, 10000);
    });
    it('should do something', () => {
        chai_1.assert.isTrue(results.length > 0);
    });
});
