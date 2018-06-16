import '../sass/style.scss';

import { $$ } from './modules/bling';
import registerVote from './modules/vote';
import registerClick from './modules/expand';

$$('.tip .title').on('click', function(e) {
  e.preventDefault();
  this.parentNode.classList.toggle('show');
  if (this.parentNode.classList.contains('show')) {
    registerClick(e);
  }
});

$$('.tip .num').on('click', function(e) {
  e.preventDefault();
  this.parentNode.classList.toggle('show');
  if (this.parentNode.classList.contains('show')) {
    registerClick(e);
  }
});

$$('.tip').on('mouseover', function() {
  this.classList.add('hovering');
});

$$('.tip').on('mouseout', function() {
  this.classList.remove('hovering');
});

$$('.votes .up').on('click', registerVote);
$$('.votes .down').on('click', registerVote);