import { photosArray } from './main.js';


const renderBigPicture = (photoData) => {
  const bigPicture = document.querySelector('.big-picture');
  const img = bigPicture.querySelector('.big-picture__img');
  const captionElement = bigPicture.querySelector('.social__caption');
  const likesCountElement = bigPicture.querySelector('.likes-count');
  const commentsCountElement = bigPicture.querySelector('.comments-count');
  const commentsListElement = bigPicture.querySelector('.social__comments');
  const thumbnailLikes = document.querySelectorAll('.picture__likes');

  img.src = photoData.url;
  img.alt = photoData.description;
  captionElement.textContent = photoData.description;
  likesCountElement.textContent = photoData.likes;
  commentsCountElement.textContent = photoData.comments.length;


  photoData.comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentItem.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsListElement.appendChild(commentItem);
  });

  const likesCountSpan = document.querySelector('.likes-count');
  let hasLiked = false;

  likesCountSpan.addEventListener('click', () => {
    if (!hasLiked) {
      photoData.likes += 1;
      thumbnailLikes[photoData.id - 1].textContent = parseInt(thumbnailLikes[photoData.id - 1].textContent, 10) + 1;
      likesCountSpan.textContent = photoData.likes;
      hasLiked = true;
    } else {
      photoData.likes -= 1;
      thumbnailLikes[photoData.id - 1].textContent = parseInt(thumbnailLikes[photoData.id - 1].textContent, 10) - 1;
      likesCountSpan.textContent = photoData.likes;
      hasLiked = false;
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
  const pictureElement = event.target.closest('.picture');
  if (!pictureElement) {
    return;
  }
  const photoId = pictureElement.dataset.photoId;
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
