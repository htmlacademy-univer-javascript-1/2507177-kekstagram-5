import { photosArray } from './main.js';

const renderBigPicture = (photoData) => {
  const bigPicture = document.querySelector('.big-picture');
  const img = bigPicture.querySelector('.big-picture__img img');
  const caption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const commentsList = bigPicture.querySelector('.social__comments');
  const pictureInfo = document.querySelectorAll('.picture__likes');
  img.src = photoData.url;
  img.alt = photoData.description;
  caption.textContent = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  photoData.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsList.appendChild(commentElement);
  });

  const likesBigSpan = document.querySelector('.likes-count');
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
