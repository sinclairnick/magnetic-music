"use strict";
exports.__esModule = true;
var path_1 = require("path");
var Song = /** @class */ (function () {
    function Song(fileName, torrentIndex, format, link) {
        this.fileName = fileName;
        this.torrentIndex = torrentIndex;
        this.format = format;
        this.link = link;
    }
    return Song;
}());
exports.Song = Song;
var Album = /** @class */ (function () {
    function Album(linkName, link, health, songs, covers) {
        this.linkName = linkName;
        this.link = link;
        this.health = health;
        this.songs = songs;
        this.covers = covers;
        this.metadata = false;
        this.flac = false;
    }
    Album.newSong = function (fileName, torrentIndex) {
        var format = path_1["default"].extname(fileName);
        if (format === '.flac')
            this.flac = true;
        return new Song(fileName.replace(format, ''), torrentIndex, format, this.link);
    };
    return Album;
}());
exports["default"] = Album;
