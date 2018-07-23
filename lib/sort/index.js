"use-strict";
/* 
Begins a torrent stream to expose the file metadata of music torrents.

Returns an Album object (see ./Album.js)
*/

//lib
const Album = require('./Album');
const fileIsAudio = require('./fileIsAudio');
const fileIsImage = require('./fileIsImage');

//node
const os = require('os');
const path = require('path');
const crypto = require('crypto');

//npm
const torrentStream = require('torrent-stream');
const torrentHealth = require('torrent-tracker-health');
const streamToBuffer = require('stream-with-known-length-to-buffer');
const mime = require('mime');


require('events').EventEmitter.prototype._maxListeners = 500;

let torrentDir = process.env.TMP_TORRENT || path.join(os.tmpdir(), 'magnetic-music');

module.exports = function (result) {

    return new Promise((resolve, reject) => {

        //filename-safe query string
        let magnet = result.magnet || result.magnetLink;
        let torrent = new torrentStream(magnet, {
            path: torrentDir
        });

        torrent.on('ready', () => {

            //if torrent contains music
            if (torrent.files.find((file, index) => {
                return fileIsAudio(file);
            })) {

                //create an Album object with name, link and health
                let album = new Album(result.name, magnet);
                let cover = null;

                //getting magnet health
                torrentHealth(magnet)
                    .then(res => {
                        album.seeds = res.seeds;
                        album.health = Math.round((res.peers > 0 ? res.seeds / res.peers : res.seeds));
                    })

                //iterate over each file and sort into songs and covers
                torrent.files.forEach((file, index) => {

                    //music file => songs array
                    if (fileIsAudio(file)) {
                        album.addSong(file.name, index);
                    }

                    //image file => to be URI'd later
                    else if (fileIsImage(file)) {
                        cover = file;
                    }

                    //once all files have been iterated and cover has been downloaded: return promise
                    if (index === torrent.files.length - 1) {
                        try {
                            streamToBuffer(cover.createReadStream(), cover.length, (err, buf)=>{
                                if(err)throw err;
                                album.cover = [`data:${mime.getType(path.extname(cover.name))};base64,${buf.toString('base64')}`];
                                let id = crypto.randomBytes(16).toString('hex');
                                album.id = id;
                                resolve(album);
                            });


                        } catch (e) {
                            let id = crypto.randomBytes(16).toString('hex');
                            album.id = id;
                            resolve(album);
                        }
                    }

                })
            }
        })
    })



}