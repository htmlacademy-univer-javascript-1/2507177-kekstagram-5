const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENTS_COUNT = 20;
const COMMENTS_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTION = [
  'Когда жизнь подкидывает лимоны, сделай лимонад... или просто сделай селфи с лимоном!',
  'Каждый момент — это возможность создать что-то удивительное.',
  'Секрет счастья — это не только улыбка, но и умение делиться ею с другими!',
  'Когда твой питомец становится настоящей звездой! ',
  'Каждый кадр — это история, которую стоит рассказать.',
  'Мечты сбываются, если ты веришь в них и действуешь!',
  'Норм',
];
const NAMES = [
  'Анна',
  'Даша',
  'Яна',
  'Андрей',
  'Дмитрий',
  'Василий',
  'Вероника',
  'Алина',
  'Павел',
  'Артем',
];
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (items) =>
  items[getRandomInteger(0, items.length -1)];
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId +=1;
    return lastGeneratedId;
  };
};
const generateCommentId = createIdGenerator();
const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENTS_SENTENCES),
).join(' ');
const createComment = () => ({
  id: generateCommentId(),
  avatar: 'img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg',
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});
const createPicture = (index) => ({
  id: index,
  url: 'photos/${index}.jpg',
  descriptiin: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENTS_COUNT) },
    createComment,
  ),
});
const getPictures = () => Array.from(
  { length: PICTURE_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex +1),
);
getPictures();
