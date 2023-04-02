import {getPhoto} from './data.js';

const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniatureContainer = document.querySelector('.pictures');

const miniatureList = getPhoto();

const miniatureListFragment = document.createDocumentFragment();

miniatureList.forEach((photo) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = photo.url;
  miniatureElement.querySelector('.picture__likes').textContent = photo.likes;
  miniatureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  miniatureListFragment.appendChild(miniatureElement);
});

miniatureContainer.appendChild(miniatureListFragment);
