import { $$ } from './bling';

export default function showAllTips() {
  $$('.tip').map(tip => tip.classList.add('show'));
}
