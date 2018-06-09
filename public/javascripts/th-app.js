import '../sass/style.scss';

import { $, $$ } from './modules/bling';

$$('.tip').on('click', function() {
  this.classList.toggle('show');
})