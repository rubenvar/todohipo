// handy debugging function
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// categories for the tips
exports.categories = [
  'mental',
  'agua',
  'bebidas',
  'alimentos',
  'ayudante',
  'respiración',
  'físico',
];

// site description used in various places
exports.siteDescription =
  'Aquí tienes remedios y consejos para quitar el hipo. La mayor guía online, más de 50 trucos para parar un ataque de hipo. Prueba varios y alige el más efectivo!';

exports.canonical = 'https://todohipo.com';

// phrases for voting buttons
exports.votePhrases = [
  '¿Te quitó el hipo?',
  '¿Te sirvió?',
  'Deja tu opinión!',
  '¿Curó tu hipo?',
  '¿Ha sido útil?',
];
