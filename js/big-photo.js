import {isEscapeKey} from './util.js';
// import './miniature.js';
// import {renderMiniatures} from './miniature.js';

const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');

const renderPhotoDetails = ({url, description, likes}) => {
  bigPhoto.querySelector('.big-picture__img img').src = url;
  bigPhoto.querySelector('.big-picture__img img').alt = description;
  bigPhoto.querySelector('.social__caption').textContent = description;
  bigPhoto.querySelector('.likes-count').textContent = likes;
};

const openBigPhoto = (data) => {
  bigPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  // commentsLoader.classList.add('hidden');
  // commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoDetails(data);
  // renderComments(data.comments);
};

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

bigPhotoClose.addEventListener('click', () => {
  closeBigPhoto();
});

export {openBigPhoto};
