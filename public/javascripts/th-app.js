import '../sass/style.scss';

import { $$ } from './modules/bling';
import registerVote from './modules/vote';
import registerClick from './modules/expand';
// import detectPajita from './modules/pajita';

// Registers clicks to db when click on tip title (only when showing)
$$('.tip .title').on('click', function(e) {
  e.preventDefault();
  this.parentNode.classList.toggle('show');
  if (this.parentNode.classList.contains('show')) {
    registerClick(e);
  }
});

// Registers clicks to db wuen click on tip number (onle when showing)
$$('.tip .num').on('click', function(e) {
  e.preventDefault();
  this.parentNode.classList.toggle('show');
  if (this.parentNode.classList.contains('show')) {
    registerClick(e);
  }
});

// Adds class "hovering" to tip when hovering
$$('.tip').on('mouseover', function() {
  this.classList.add('hovering');
});

// Removes class "hovering" from tip when stop hovering
$$('.tip').on('mouseout', function() {
  this.classList.remove('hovering');
});

// Registers votes on tip vote form
$$('.votes .up').on('click', registerVote);
$$('.votes .down').on('click', registerVote);

// Checks for word "pajita" and adds "<abbr>" tags around it
// ??