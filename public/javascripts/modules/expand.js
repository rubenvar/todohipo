import axios from 'axios';

function registerClick(e) {
  const id = e.target.id.split('-')[1];
  axios
    .post('/api/count-click', { id })
    .catch(console.error);
}

export default registerClick;