import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import registerVote from './modules/vote';

$$('.tip .title').on('click', function(e) {
  e.preventDefault();
  this.parentNode.classList.toggle('show');
});

$$('.votes .up').on('click', registerVote);
$$('.votes .down').on('click', registerVote);