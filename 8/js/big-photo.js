import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
let onCommentsShowClick;

const COMMENTS_PER_PORTION = 5;

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const createCommentList = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(createComment(comment));
  });
  commentList.append(fragment);
};

const renderComments = (comments) => {
  let commentsShow = 0;

  if (comments.length <= COMMENTS_PER_PORTION) {
    createCommentList(comments);
    commentsShow = comments.length;
    commentsLoader.classList.add('hidden');
  } else {
    createCommentList(comments.slice(commentsShow, COMMENTS_PER_PORTION));
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsShowButtonClick);
    commentsShow += COMMENTS_PER_PORTION;
  }

  function onCommentsShowButtonClick () {
    createCommentList(comments.slice(commentsShow, commentsShow + COMMENTS_PER_PORTION));
    commentsShow += COMMENTS_PER_PORTION;
    if (commentsShow >= comments.length) {
      commentsShow = comments.length;
      commentsLoader.classList.add('hidden');
    }
    commentsCount.innerHTML = `${commentsShow} из <span class="comments-count">${comments.length}</span> комментариев`;
  }

  commentsCount.innerHTML = `${commentsShow} из <span class="comments-count">${comments.length}</span> комментариев`;

  return onCommentsShowButtonClick;
};

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
  commentList.innerHTML = '';
  onCommentsShowClick = renderComments(data.comments);
};

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsShowClick);
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
