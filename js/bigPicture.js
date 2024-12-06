import { photosArray } from './main.js';

const renderBigPicture = (photo) => {
  const bigPicture = document.querySelector('.big-picture');
  const img = bigPicture.querySelector('.big-picture__img img');
  const caption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const commentsList = bigPicture.querySelector('.social__comments');


  img.src = photo.url;
  img.alt = photo.description;
  caption.textContent = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;


  updateComments(commentsList, photo.comments);


  setupLikesManagement(photo, likesCount);


  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const updateComments = (commentsList, comments) => {
  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsList.appendChild(commentElement);
  });
};

const setupLikesManagement = (photo, likesCountSpan) => {
  let isLiked = false;
  const thumbnailLikes = document.querySelectorAll('.picture__likes');


  likesCountSpan.removeEventListener('click', toggleLike);
  likesCountSpan.addEventListener('click', toggleLike);

  function toggleLike() {
    if (!isLiked) {
      photo.likes += 1;
      thumbnailLikes[photo.id - 1].textContent = parseInt(thumbnailLikes[photo.id - 1].textContent, 10) + 1;
      likesCountSpan.textContent = photo.likes;
      isLiked = true;
    } else {
      photo.likes -= 1;
      thumbnailLikes[photo.id - 1].textContent = parseInt(thumbnailLikes[photo.id - 1].textContent, 10) - 1;
      likesCountSpan.textContent = photo.likes;
      isLiked = false;
    }
  }
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
  const photo = photosArray.find((item) => item.id === +photoId);
  if (photo) {
    renderBigPicture(photo);
  }
});

document.querySelector('#picture-cancel').addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});
