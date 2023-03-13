import {getRandomInteger, getRandomArrayElement} from './util.js';

const PHOTO_COUNT = 25;
const AVATAR_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 5;
const DESCRIPTIONS = [
  'Отпуск 2023',
  'Выходные',
  'Трудовые будни',
  'Итоги года',
  'Долгожданный отпуск',
  'Ура! Начались выходные!'
];
const COMMENTS_TEMPLATES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Михаил',
  'Надежда',
  'Иван',
  'Андрей',
  'Анна',
  'Екатерина'
];

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const createMessage = () => Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(COMMENTS_TEMPLATES)).join(' ');

const createComment = () => ({
  id: createIdGenerator(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createComment)
});

const getPhoto = () => Array.from({length: PHOTO_COUNT}, (_, photoIndex) => createPhoto(photoIndex + 1));

export {getPhoto};
