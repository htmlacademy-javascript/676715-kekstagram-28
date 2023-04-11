const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButton = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButton = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerButton.addEventListener('click', onSmallerButton);
biggerButton.addEventListener('click', onBiggerButton);

export {resetScale};
