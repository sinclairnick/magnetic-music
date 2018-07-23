# magnetic-music
npm package  which searches various torrenting databases for music and returns a promise containing sorted Album objects.
---

### Usage
```javascript
const magmusic = require('magnetic-music');

let arr = [];
magmusic({
  query: 'mozart',
  array: arr
})
.then(albums => console.log(albums));
```

This would result in output which looks like:
```javascript
[
  .
  .
  .
Album {
  linkName: 'Mozart - Requiem (Herbert von Karajan).mp3', //title of the torrent
  link: magnet_uri, //magnet URI for the torrent
  health: 2,  //seeders/leechers
  seeds: 2,   //amount of seeders
  artist: null,
  songs:  //information for each song
   [ { fileName: 'Mozart - Requiem (Herbert von Karajan)', //filename without extension
       torrentIndex: 0, //index of song in torrent's files
       type: '.mp3',  //audio type
       link: magnet_uri,  //magnet URI for torrent
       title: null,
       track: null,
       durationPretty: null,
       duration: null,
       artists: null,
       cover: null,
       metadata: false } ],
  cover: null, //a base64 data URI for the last image found in the torrent (otherwise null)
  year: null,
  metadata: false,
  flac: false,  //whether the torrent is a lossless audio (has a '.flac' extension)
  id: '4326fe584b902e12ef7d8b9e9d2ff89e'  //a randomly generated hex number for IDing this object
  }
  .
  .
  .
]
```
Every annotated property is guaranteed to be fetched, except the cover, as not all torrents contain image files. The other "null" properties are placeholders for getting more detailed metadata which can be done through another module of mine, which will be uploaded soon.

### Options
The object which you pass to the search function must have a query, but can also include an optional array and page number. 

The option to add an array allows you to access the Albums as they are asynchronously added to the array. This means the first search result can be displayed slightly faster than when having to wait for the whole promise to resolve, and reduces the dependency or wait time of one of the torrent databases which are searched. This application is especially useful in conjunction with JS view frameworks which observe objects like React or Vue.

The optional page number allows you to paginate and get more results as you see fit.


```javascript
{
  query: STRING,  //required
  array: ARRAY,   //optional
  page: NUMBER    //optional
}
```

TO-DO:
* Implement type-checking via TypeScript
* Add more torrent databases