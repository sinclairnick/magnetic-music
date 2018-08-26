"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const WebTorrent = require('webtorrent');
const Album_1 = require("./Album");
const audioFormats = ['.mp3', '.wav', '.m4a', '.aac', '.flac'];
const imageFormats = ['.jpg', '.png', '.jpeg'];
exports.default = (result) => new Promise((resolve, reject) => {
    const client = new WebTorrent();
    const magnet = result.magnet || result.magnetLink;
    if (!client.get(magnet))
        client.add(magnet, torrent => {
            stopDL(torrent);
            if (audioExistsIn(torrent)) {
                const files = torrent.files.reduce(intoImagesAndAudio, { audio: [], images: [] });
                resolve(new Album_1.default(torrent.name, magnet, torrent.ratio, files.audio.map(({ name, index }) => Album_1.default.newSong(name, index, magnet)), files.images, torrent.size));
                client.destroy((err) => { if (err)
                    console.log(err); });
            }
            else
                reject(`No supported audio files in ${torrent.name}`);
        });
    setTimeout(() => reject('Timed out after 15 seconds'), 15000);
});
const stopDL = (torrent) => torrent.deselect(0, torrent.pieces.length - 1, false);
const audioExistsIn = (torrent) => torrent.files.find(file => (audioFormats.indexOf(path.extname(file.name))) > -1);
const intoImagesAndAudio = (state, file, index) => {
    if (audioFormats.indexOf(path.extname(file.name)) > -1) {
        state.audio = [...state.audio, { name: file.name, index }];
    }
    ;
    if (imageFormats.indexOf(path.extname(file.name)) > -1) {
        state.images = [...state.images, file];
    }
    ;
    return state;
};
