var magnetic = require('./index');
var assert = require('chai');

// describe('magnetic-music', () => {
//     it('should add albums to an array', () => {
//         let arr = [];
//         magnetic('frank ocean', {array: arr})
//         setTimeout(()=> {
//             assert(arr.length > 1, 'Array has contents in it');
//         }, 10000);
//     });
// })

magnetic({query: 'frank ocean', array: []});