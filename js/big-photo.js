import {isEscapeKey} from './util.js';
// import './miniature.js';
// import {renderMiniatures} from './miniature.js';

const COMMENTS_PER_PORTION = 5;
const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');

let commentsShown = 0;
let comments = [];

const createComment = ({avatar, name, message}) => {
  const comment = document.createElement ('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35">';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  // task1
  // commentList.innerHTML = '';

  // const fragment = document.createDocumentFragment();
  // comments.forEach((comment) => {
  //   const commentElement = createComment(comment);
  //   fragment.append(commentElement);
  // });

  // commentList.append(fragment);

  // task2
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

// старый вариант - как в лекции
// const renderPhotoDetails = ({url, description, likes}) => {
//   bigPhoto.querySelector('.big-picture__img img').src = url;
//   bigPhoto.querySelector('.big-picture__img img').alt = description;
//   bigPhoto.querySelector('.social__caption').textContent = description;
//   bigPhoto.querySelector('.likes-count').textContent = likes;
// };

const renderPhotoDetails = ({url, description, likes}) => {
  bigPhoto.querySelector('.big-picture__img img').src = url;
  bigPhoto.querySelector('.big-picture__img img').alt = description;
  bigPhoto.querySelector('.social__caption').textContent = description;
  bigPhoto.querySelector('.likes-count').textContent = likes;
};

const openBigPhoto = (data) => {
  bigPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoDetails(data);
  renderComments(data.comments);
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
