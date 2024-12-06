export const renderThumbnails = (photosArray) => {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.getElementById('picture');
  photosArray.forEach((photoData) => {
    const pictureElement = template.content.cloneNode(true);
    const img = pictureElement.querySelector('.picture__img');
    const likesSpan = pictureElement.querySelector('.picture__likes');
    const commentsSpan = pictureElement.querySelector('.picture__comments');
    pictureElement.querySelector('a').dataset.photoId = photoData.id;
    img.src = photoData.url;
    img.alt = photoData.description;
    likesSpan.textContent = photoData.likes;
    commentsSpan.textContent = photoData.comments.length;
    picturesContainer.appendChild(pictureElement);
  });
};
