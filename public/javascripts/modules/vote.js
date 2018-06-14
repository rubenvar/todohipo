import axios from 'axios';
import { $ } from './bling';

function registerVote(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(resp => {
      const html = `<p class="total-voted">${resp.data.votes}</p>`;
      $(`#votes-${resp.data._id}`).innerHTML = html;
      // $(`#total-${resp.data._id}`).innerHTML = resp.data.votes;
      // this.innerHTML = '';
    })
    .catch(console.error);
}

export default registerVote;