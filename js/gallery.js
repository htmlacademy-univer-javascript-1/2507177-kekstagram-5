import { getRandomInteger } from './util.js';
import { COMMENTS, NAMES } from './data.js';

export const generatePhotosArray = () => {
  const photos = [];
  for (let i = 0; i < 25; i++) {
    const photoData = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: `Описание фотографии ${i + 1}`,
      likes: getRandomInteger(15, 200),
      comments: []
    };
    const commentCount = getRandomInteger(0, 30);
    const commentIdSet = new Set();
    for (let j = 0; j < commentCount; j++) {
      let commentId = getRandomInteger(1, 1000);
      while (commentIdSet.has(commentId)) {
        commentId = getRandomInteger(1, 1000);
      }
      commentIdSet.add(commentId);
      const comment = {
        id: commentId,
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
        name: NAMES[getRandomInteger(0, NAMES.length - 1)]
      };
      photoData.comments.push(comment);
    }
    photos.push(photoData);
  }
  return photos;
};


