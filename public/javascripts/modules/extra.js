function insertBefore(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode);
}

function addExtraBlock(n) {
  const newDiv = document.createElement('div');
  newDiv.innerHTML = 'casa';
  insertBefore(newDiv, n)
}

export default addExtraBlock;