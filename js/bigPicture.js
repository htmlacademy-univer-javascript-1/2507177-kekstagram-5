import { photosArray } from './main.js';

const COMMENTS_LIMIT_PER_PAGE = 5;
let visibleCommentsCount = 0;
let activePhoto = null;

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const loadMoreCommentsButton = bigPicture.querySelector('.comments-loader');
const totalCommentCount = bigPicture.querySelector('.social__comment-count');
const likesBigSpan = bigPicture.querySelector('.likes-count');
const pictureCancel = document.querySelector('#picture-cancel');
const picturesContainer = document.querySelector('.pictures');

const toggleLike = () => {
  const pictureInfo = document.querySelectorAll('.picture__likes');

  if (!activePhoto.isLiked) {
    activePhoto.likes += 1;
    pictureInfo[activePhoto.id - 1].textContent =
      parseInt(pictureInfo[activePhoto.id - 1].textContent, 10) + 1;
    likesBigSpan.textContent = activePhoto.likes;
    activePhoto.isLiked = true;
  } else {
    activePhoto.likes -= 1;
    pictureInfo[activePhoto.id - 1].textContent =
      parseInt(pictureInfo[activePhoto.id - 1].textContent, 10) - 1;
    likesBigSpan.textContent = activePhoto.likes;
    activePhoto.isLiked = false;
  }
};

const renderComments = () => {
  const commentsToDisplay = activePhoto.comments.slice(
    visibleCommentsCount,
    visibleCommentsCount + COMMENTS_LIMIT_PER_PAGE
  );

  commentsToDisplay.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsList.appendChild(commentElement);
  });

  visibleCommentsCount += commentsToDisplay.length;
  totalCommentCount.textContent = `${visibleCommentsCount} из ${activePhoto.comments.length} комментариев`;

  if (visibleCommentsCount >= activePhoto.comments.length) {
    loadMoreCommentsButton.classList.add('hidden');
  } else {
    loadMoreCommentsButton.classList.remove('hidden');
  }
};

const renderBigPicture = (photoData) => {
  activePhoto = photoData;
  visibleCommentsCount = 0;

  const img = bigPicture.querySelector('.big-picture__img img');
  const caption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');

  img.src = photoData.url;
  img.alt = photoData.description;
  caption.textContent = photoData.description;
  likesCount.textContent = photoData.likes;

  commentsList.innerHTML = '';
  totalCommentCount.textContent = `0 из ${photoData.comments.length} комментариев`;

  if (!Object.prototype.hasOwnProperty.call(activePhoto, 'isLiked')) {
    activePhoto.isLiked = false;
  }

  renderComments();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  loadMoreCommentsButton.addEventListener('click', renderComments);
  likesBigSpan.addEventListener('click', toggleLike);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  loadMoreCommentsButton.removeEventListener('click', renderComments);
  likesBigSpan.removeEventListener('click', toggleLike);
};

picturesContainer.addEventListener('click', (event) => {
  const picture = event.target.closest('.picture');
  if (!picture) {
    return;
  }

  const photoId = picture.dataset.photoId;
  const photoData = photosArray.find((item) => item.id === +photoId);
  if (photoData) {
    renderBigPicture(photoData);
  }
});

pictureCancel.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});
