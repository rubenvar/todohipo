/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
// exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Some details about the site
// exports.siteName = `todohipo 👨‍⚕️, 101 formas de quitar el hipo`;
exports.siteDesc = '¿Cómo quitar el hipo? Mira aquí más de 100 formas de curar el hipo, bebiendo agua o con un susto, tú eliges 👍';

// exports.menu = [
//   { slug: '/polls', title: '📊 Polls', },
//   { slug: '/new/poll', title: '✍️  Add new', },
// ];

// The categories for the tips
exports.categories = ['mental', 'agua', 'bebidas', 'alimentos', 'ayudante', 'respiración'];

// Phrases for Tip Voting buttons
exports.votePhrases = [
  '¿Te quitó el hipo?',
  '¿Te sirvió?',
  'Deja tu opinión!',
  '¿Curó tu hipo?',
  '¿Ha sido útil?'
];