import { $$ } from './bling';

const tips = $$('.tip');

function showAllTips() {
  tips.map(tip => {
    tip.classList.add('show');
  });
}

export default showAllTips;
