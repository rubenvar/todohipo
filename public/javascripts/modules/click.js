import axios from 'axios';

function registerClick(e) {
  // Gets the id of the parent of the clicked elem (num, title or votes) and get the _id of the tip
  const id = e.target.parentNode.id.split('-')[1];
  // Posts the _id to store click 
  axios
    .post('/api/count-click', { id })
    .catch(console.error);
}

export default registerClick;