import { resetImageScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effects.js';
import { sendData } from './api.js';
import { displayErrorMessage, displaySuccessMessage } from './message.js';

const documentBody = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const modalOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const imageInput = uploadForm.querySelector('.img-upload__input');
const descriptionField = uploadForm.querySelector('.text_description');
const imagePreview = uploadForm.querySelector('.img-upload__preview');
const effectPreviews = uploadForm.querySelectorAll('.effects__preview');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const MAX_HASHTAG_COUNT = 5;
const VALID_TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorMessages = {
  EXCEEDS_MAX_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NON_UNIQUE_HASHTAGS: 'Хешетеги должны быть уникальными',
  INVALID_HASHTAG_FORMAT: 'Неправильный хештег',
};

const pristineValidator = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeModal = () => {
  uploadForm.reset();
  resetImageScale();
  resetEffect();
  pristineValidator.reset();
  modalOverlay.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.removeEventListener('submit', onFormSubmit);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (pristineValidator.validate()) {
    submitButton.disabled = true;
    await sendData(new FormData(uploadForm))
      .then(() => {
        displaySuccessMessage();
        closeModal();
      })
      .catch(() => {
        displayErrorMessage();
        closeModal();
      });
  }
};

const openModal = (evt) => {
  imagePreview.querySelector('img').src = URL.createObjectURL(evt.target.files[0]);
  const imageURL = imagePreview.querySelector('img').src;
  effectPreviews.forEach((element) => {
    element.style.backgroundImage = `url('${imageURL}')`;
  });
  uploadForm.addEventListener('submit', onFormSubmit);
  modalOverlay.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isTextInputFocused = () => document.activeElement === hashtagInput || document.activeElement === descriptionField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextInputFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

const onCloseButtonClick = () => {
  closeModal();
};

const onFileInputChange = (evt) => {
  openModal(evt);
};

imageInput.addEventListener('change', onFileInputChange);
closeButton.addEventListener('click', onCloseButtonClick);
initEffect();

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_TAG_PATTERN.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristineValidator.addValidator(hashtagInput, hasValidCount, ErrorMessages.EXCEEDS_MAX_COUNT, 3, true);

pristineValidator.addValidator(hashtagInput, hasUniqueTags, ErrorMessages.NON_UNIQUE_HASHTAGS, 1, true);

pristineValidator.addValidator(hashtagInput, hasValidTags, ErrorMessages.INVALID_HASHTAG_FORMAT, 2, true);

