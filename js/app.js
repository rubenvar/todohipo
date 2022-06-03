import '../styles/style.scss';

import { $, $$ } from './modules/bling';
import registerClick from './modules/click';
import registerVote from './modules/vote';
import showAllTips from './modules/show';

// Shows tip & registers clicks to db when click on tip num, title, or votes
$$('.tip .header').on('click', function(e) {
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
$$('.vote-forms .up').on('click', registerVote);
$$('.vote-forms .down').on('click', registerVote);

// Shows all tips (adds class 'show' to all tips)
$('.show-all-button').on('click', showAllTips);
