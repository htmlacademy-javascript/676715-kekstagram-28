import {isEscapeKey} from './util.js';

const COMMENTS_PER_PORTION = 5;

const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImage = bigPhoto.querySelector('.big-picture__img img');
const bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
let onCommentsShowClick;

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

  function hiddenButton () {
    commentsShow = comments.length;
    commentsLoader.classList.add('hidden');
  }

  function showComments () {
    commentsShow += COMMENTS_PER_PORTION;
  }

  function showCommentsCount () {
    commentsCount.innerHTML = `${commentsShow} из <span class="comments-count">${comments.length}</span> комментариев`;
  }

  if (comments.length <= COMMENTS_PER_PORTION) {
    createCommentList(comments);
    hiddenButton ();
  } else {
    createCommentList(comments.slice(commentsShow, COMMENTS_PER_PORTION));
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsShowButtonClick);
    showComments();
  }
  showCommentsCount ();

  function onCommentsShowButtonClick () {
    createCommentList(comments.slice(commentsShow, commentsShow + COMMENTS_PER_PORTION));
    showComments();
    if (commentsShow >= comments.length) {
      hiddenButton ();
    }
    showCommentsCount ();
  }
  return onCommentsShowButtonClick;
};

const renderPhotoDetails = ({url, description, likes}) => {
  bigPhotoImage.src = url;
  bigPhotoImage.alt = description;
  bigPhoto.querySelector('.social__caption').textContent = description;
  bigPhoto.querySelector('.likes-count').textContent = likes;
};

const openBigPhoto = (data) => {
  bigPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
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
