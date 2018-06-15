import '../sass/style.scss';

import { $$ } from './modules/bling';
import registerVote from './modules/vote';

$$('.tip .title').on('click', function(e) {
  e.preventDefault();
  this.parentNode.classList.toggle('show');
});

$$('.tip .num').on('click', function(e) {
  e.preventDefault();
  this.parentNode.classList.toggle('show');
});

$$('.tip').on('mouseover', function() {
  this.classList.add('hovering');
});

$$('.tip').on('mouseout', function() {
  this.classList.remove('hovering');
});

$$('.votes .up').on('click', registerVote);
$$('.votes .down').on('click', registerVote);