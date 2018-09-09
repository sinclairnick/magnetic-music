# magnetic-music
searches for and formats music torrents into Album objects



## Installation 
```javascript
npm i --save magnetic-music
```

## Usage

```javascript
import magMusic from 'magnetic-music';
//or
const magMusic = require('magnetic-music').default;

const albums = [];
magMusic('frank ocean', { array: albums })
```

It is recommended to provide your own array which will receive Albums individually, as their metadata is retrieved.

Alternatively, you can wait for the promise to be resolved either when all formatting is done, or a 15 second timeout is complete:

```javascript
let albums;
magMusic('frank ocean').then( res => albums = res)
```

The latter method is generally slower because of the nature of torrents.

## Output

Both methods will result in arrays of Album objects:
```javascript
Album {
  linkName: String,
  link: 'magnet:?xt=urn:...',
  health: X,
  songs: Song[],
  covers: Buffer[],
  size: 'XXX.XX MB',
  metadata: Boolean 
    }
```
With arrays of Song objects:
```javascript
Song {
  fileName: String,
  torrentIndex: Number,
  format: String,
  link: 'magnet:?xt=urn:...',
  length: Number,
  file: any
    }
```

### License
magnetic-music is [MIT licensed](./LICENSE).