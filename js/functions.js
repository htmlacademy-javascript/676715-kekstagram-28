// 1. Функция для проверки длины строки

function stringLength (string, length) {
  // eslint-disable-next-line no-unneeded-ternary
  return (string.length <= length) ? true : false;
}

stringLength ('Мама мыла раму окна в зале', 20);
stringLength ('Мама мыла раму окна в зале', 26);
stringLength ('Мама мыла раму окна в зале', 30);


// 2. Функция для проверки, является ли строка палиндромом.

let maxIndex;
let message;

function isPalindrome (string) {
  let j = string.length;

  if (string.length % 2 !== 0) {
    maxIndex = (string.length - 1) / 2;
  } else {
    maxIndex = string.length / 2 - 1;
  }

  for (let i = 0; i <= maxIndex; i++) {
    j -= 1;
    if (string[i] !== string[j] && string[i].toUpperCase() !== string[j] && string[i].toLowerCase() !== string[j]) {
      i = maxIndex;
      message = 'Это слово не палиндром';
      break;
    }
    message = 'Это слово палиндром';
  }

  return message;
}

isPalindrome ('топот');
isPalindrome ('ДовОд');
isPalindrome ('ДоВоД');
isPalindrome ('Кекс');


// 3. Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

function numbersFromString (string) {
  let array = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if ((Number(string[i] !== ' ')) && (!isNaN(Number(string[i])))) {
      array += string[i];
      // console.log (array);
    }
  }
  return parseInt(array, 10);
}

numbersFromString ('2023 год');
numbersFromString ('ECMAScript 2022');
numbersFromString ('1 кефир, 0.5 батона');
numbersFromString ('агент 007');
numbersFromString ('а я томат');


// 4. Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.

let newString;

function addStringInString (string1, length, string2) {
  if (string1.length > length) {
    // Если исходная строка превышает заданную длину, она не должна обрезаться.
    newString = string1;
  } else if (length - string1.length <= string2.length) {
    // Если «добивка» слишком длинная, она обрезается с конца.
    newString = string2.slice(0, length - string1.length) + string1;
  } else {
    // Если «добивки» не хватает
    newString = string2 + string1;
    if (newString.length < length) {
      for (let i = 0; i <= length - newString.length; i++) {
        newString = string2.slice(0, length - newString.length) + newString;
      }
    }
  }
  return newString;
}

addStringInString ('1', 2, '0');
addStringInString ('1', 4, '0');
addStringInString ('q', 4, 'werty');
addStringInString ('q', 4, 'we');
addStringInString ('qwerty', 4, '0');
