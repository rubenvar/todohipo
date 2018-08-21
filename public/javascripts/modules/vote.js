import axios from 'axios';
import { $ } from './bling';

function registerVote(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(resp => {
      console.log(resp.data.votes);
      this.parentNode.innerHTML = '<p class="vota gracias">Muchas gracias por tu voto!</p>';
      const html = `<p class="total"><span class="util">Utilidad: </span>${resp.data.votes.avg}<span class="vote-max"> de 5</span></p>`;
      $(`#votes-${resp.data._id}`).innerHTML = html;
    })
    .catch(console.error);
}

export default registerVote;