import axios from 'axios';
import { $ } from './bling';

function registerVote(e) {
  e.preventDefault();
  console.log(this);
  console.log(this.action);
  axios
    .post(this.action)
    .then(resp => {
      const html = `<p class="total-voted">${resp.data.votes}</p>`;
      $(`#votes-${resp.data._id}`).innerHTML = html;
    })
    .catch(console.error);
}

export default registerVote;