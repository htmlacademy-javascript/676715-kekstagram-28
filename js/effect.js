const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const image = document.querySelector('.img-upload__preview img');
const effectsItem = document.querySelector('.effects');
const sliderItem = document.querySelector('.effect-level__slider');
const sliderContainerItem = document.querySelector('.img-upload__effect-level');
const effectLevelItem = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const openSlider = () => {
  sliderContainerItem.classList.remove('.hidden');
};

const closeSlider = () => {
  sliderContainerItem.classList.add('.hidden');
};

const updateSlider = () => {
  sliderItem.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
    connect: 'lower',
  });

  if (isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('.effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  image.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderItem.noUiSlider.get();
  image.style.filter = isDefault() ? DEFAULT_EFFECT.style : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelItem.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderItem, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
closeSlider();

effectsItem.addEventListener('click', onEffectsChange);
sliderItem.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
