"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
class Song {
    constructor(fileName, torrentIndex, format, link, length, file) {
        this.fileName = fileName;
        this.torrentIndex = torrentIndex;
        this.format = format;
        this.link = link;
        this.length = length;
        this.file = file;
    }
}
exports.Song = Song;
class Album {
    constructor(linkName, link, health, songs, covers, size) {
        this.linkName = linkName;
        this.link = link;
        this.health = health;
        this.songs = songs;
        this.covers = covers;
        this.size = size;
        this.metadata = false;
    }
}
Album.newSong = (fileName, torrentIndex, link, length, file) => {
    const format = path.extname(fileName);
    return new Song(fileName.replace(format, ''), torrentIndex, format, link, length, file);
};
exports.default = Album;
