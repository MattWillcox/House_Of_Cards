// "use strict";

// var db = require('Knex')({
//   client: 'pg',
//   connection: require("./settings"),
//   searchPath: 'knex,public'
// });

// // Defines helper functions for saving and getting tweets, using the database `db`
// module.exports = function DataHandler() {
//   return {
//     // Saves a tweet to `db`

//     findRank: function(user, callback) {
//         db.select('name', 'wins')
//         .from('users')
//         .orderBy('wins', 'desc')
//         .then((rows) => {
//           return rows.findIndex((index) => {return index === user;}) + 1;)
//         })
//         callback(null, true);
//     },
//     // Get all tweets in `db`, sorted by newest first
//     getTweets: function(callback) {
//         db.collection('tweets').find().toArray((err, data) => {
//           callback(null, data);
//       });
//     }
//   };
// };
