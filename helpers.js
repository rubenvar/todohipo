/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// The categories for the tips
exports.categories = ['mental', 'agua', 'bebidas', 'alimentos', 'ayudante', 'respiración', 'físico'];

// Phrases for Tip Voting buttons
exports.votePhrases = [
  '¿Te quitó el hipo?',
  '¿Te sirvió?',
  'Deja tu opinión!',
  '¿Curó tu hipo?',
  '¿Ha sido útil?'
];