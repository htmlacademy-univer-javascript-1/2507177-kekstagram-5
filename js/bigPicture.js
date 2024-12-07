import { photosArray } from './main.js';

const COMMENTS_LIMIT_PER_PAGE = 5;
let visibleCommentsCount = 0;
let activePhoto = null;

const renderComments = () => {
  const commentsList = document.querySelector('.social__comments');
  const loadMoreCommentsButton = document.querySelector('.comments-loader');
  const totalCommentCount = document.querySelector('.social__comment-count');
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
  const bigPicture = document.querySelector('.big-picture');
  const img = bigPicture.querySelector('.big-picture__img img');
  const caption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsList = bigPicture.querySelector('.social__comments');
  const totalCommentCount = document.querySelector('.social__comment-count');

  img.src = photoData.url;
  img.alt = photoData.description;
  caption.textContent = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsList.innerHTML = '';
  totalCommentCount.textContent = `0 из ${photoData.comments.length} комментариев`;
  const likesBigSpan = bigPicture.querySelector('.likes-count');
  const pictureInfo = document.querySelectorAll('.picture__likes');
  let isLiked = false;


  likesBigSpan.addEventListener('click', () => {
    if (!isLiked) {
      photoData.likes += 1;
      pictureInfo[photoData.id - 1].textContent = parseInt(pictureInfo[photoData.id - 1].textContent, 10) + 1;
      likesBigSpan.textContent = photoData.likes;
      isLiked = true;
    } else {
      photoData.likes -= 1;
      pictureInfo[photoData.id - 1].textContent = parseInt(pictureInfo[photoData.id - 1].textContent, 10) - 1;
      likesBigSpan.textContent = photoData.likes;
      isLiked = false;
    }
  });
  renderComments();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const picturesContainer = document.querySelector('.pictures');
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

document.querySelector('#picture-cancel').addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});

document.querySelector('.comments-loader').addEventListener('click', renderComments);
