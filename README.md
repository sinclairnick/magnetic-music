# magnetic-music
NPM Package which searches various torrenting databases for music and adds the sorted results to an array, in the form of Album objects.

Note: This package cannot practically implement promises due to the nature of torrents, and the speed of finding their metadata. Thus, an array must be provided where the Album objects are added to.

---

###Usage
```javascript
const magmusic = require('magnetic-music');

let arr = [];
magmusic({
  query: 'mozart',
  array: arr
})
.then(albums => console.log(albums));
```

###Options
In addition to the required "query" and "array" properties, you can also specify the page number you wish to search. This allows you to paginate as required.

```javascript
{
  query: STRING,  //required
  array: ARRAY,   //required
  page: NUMBER    //optional
}
