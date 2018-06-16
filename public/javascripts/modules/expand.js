import axios from 'axios';

function registerClick(e) {
  const id = e.target.parentNode.id.split('-')[1];
  axios
    .post('/api/count-click', { id })
    .catch(console.error);
}

export default registerClick;