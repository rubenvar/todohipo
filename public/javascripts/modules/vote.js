import axios from 'axios';
import { $ } from './bling';

function registerVote(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(resp => {
      this.parentNode.classList.add('hidden');
      const html = `<p class="total">${resp.data.votes}</p>`;
      $(`#votes-${resp.data._id}`).innerHTML = html;
    })
    .catch(console.error);
}

export default registerVote;