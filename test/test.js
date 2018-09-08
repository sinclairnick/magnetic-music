"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const Album_1 = require("../src/Album");
const index_1 = require("../index");
const deepEqual = require("deep-equal");
describe('magMusic()', () => {
    let array = [];
    let page1;
    let page2;
    before((done) => {
        index_1.default('Frank Ocean', { array, page: 1 }).then(res => {
            page1 = res;
            done();
        });
        page2 = index_1.default('Frank Ocean', { page: 2 }).then(res => { page2 = res; });
    });
    it('returns an array', () => {
        assert(page1 instanceof Array);
    });
    it('returns only Album objects', () => {
        assert(page1.every(result => result instanceof Album_1.default));
    });
    it('returns different results based on the page', () => {
        assert(!deepEqual(page1, page2));
    });
});
describe('magMusic() before resolved', () => {
    let array = [];
    before((done) => {
        index_1.default('Frank Ocean', { array });
        setTimeout(() => done(), 10000);
    });
    it('pushes items to the provided array', () => {
        assert(array.length > 1);
    });
    it('only pushes albums', () => {
        assert(array.every(album => album instanceof Album_1.default));
    });
});
