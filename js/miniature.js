const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniatureContainer = document.querySelector('.pictures');

const renderMiniatures = (photos) => {
  const miniaturesFragment = document.createDocumentFragment();

  photos.forEach(({id, url, description, likes, comments}) => {
    const miniatureElement = miniatureTemplate.cloneNode(true);
    miniatureElement.querySelector('.picture__img').src = url;
    miniatureElement.querySelector('.picture__img').alt = description;
    miniatureElement.querySelector('.picture__likes').textContent = likes;
    miniatureElement.querySelector('.picture__comments').textContent = comments.length;
    miniatureElement.dataset.miniatureId = id;
    miniaturesFragment.appendChild(miniatureElement);
  });

  miniatureContainer.appendChild(miniaturesFragment);
};

export {renderMiniatures};
