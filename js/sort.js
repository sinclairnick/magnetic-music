"use strict";
exports.__esModule = true;
var path_1 = require("path");
var webtorrent_1 = require("webtorrent");
var Album_1 = require("./Album");
var audioFormats = ['.mp3', '.wav', '.m4a', '.aac', '.flac'];
var imageFormats = ['.jpg', '.png', '.jpeg'];
exports["default"] = (function (result) { return new Promise(function (resolve, reject) {
    var client = new webtorrent_1["default"]();
    var magnet = result.magnet || result.magnetLink;
    if (!client.get(magnet))
        client.add(magnet, function (torrent) {
            stopDL(torrent);
            if (audioExistsIn(torrent)) {
                var files = torrent.files
                    .reduce(function (state, file, index) {
                    path_1["default"].extname(file) in audioFormats ? state.audio = state.audio.concat([{ name: file.name, index: index }]) :
                        path_1["default"].extname(file) in imageFormats ? state.images = state.images.concat([file]) :
                            null;
                }, { audio: [], images: [] });
                resolve(new Album_1["default"](torrent.name, magnet, torrent.ratio, files.audio.map(function (_a) {
                    var name = _a.name, index = _a.index;
                    return Album_1["default"].newSong(name, index);
                }), files.images));
                client.destroy(function (err) { return console.warn("Client (" + torrent.name + ") could not be destroyed"); });
            }
            else
                reject("No supported audio files in " + torrent.name);
        });
}); });
var stopDL = function (torrent) { return torrent.deselect(0, torrent.pieces.length - 1, false); };
var audioExistsIn = function (torrent) { return torrent.files.find(function (file) { return path_1["default"].extname(file) in audioFormats; }); };
