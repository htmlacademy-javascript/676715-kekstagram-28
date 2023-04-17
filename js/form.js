import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';

const TAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Хештеги неверно заполнены';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const fileField = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const formClose = form.querySelector('#upload-cancel');
const hashtagField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'effects__label',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const openModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === descriptionField;

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

const onFileChange = () => {
  openModal();
};

const onFormCloseClick = () => {
  closeModal();
};

const isValidTagsCount = (tags) => tags.length <= TAG_COUNT;

const isValidUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isValidTagSymbols = (tag) => VALID_SYMBOLS.test(tag);

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return isValidTagsCount(tags) && isValidUniqueTags(tags) && tags.every(isValidTagSymbols);
};

pristine.addValidator(hashtagField, validateTags, TAG_ERROR_TEXT);

const setOnFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async(evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await onSuccess(new FormData(form));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFileChange);
formClose.addEventListener('click', onFormCloseClick);

export {setOnFormSubmit, closeModal};
