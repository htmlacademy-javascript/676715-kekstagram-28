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
let activeEffect = DEFAULT_EFFECT;

const image = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderItem = document.querySelector('.effect-level__slider');
const effectsItem = document.querySelector('.effects__list');

const isDefault = () => activeEffect === DEFAULT_EFFECT;

const openSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const closeSlider = () => {
  sliderContainer.classList.add('hidden');
};

const updateSlider = () => {
  sliderItem.noUiSlider.updateOptions({
    range: {
      min: activeEffect.min,
      max: activeEffect.max,
    },
    start: activeEffect.max,
    step: activeEffect.step
  });

  if (isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  activeEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  image.className = `effects__preview--${activeEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderItem.noUiSlider.get();
  if (isDefault()) {
    image.style.filter = DEFAULT_EFFECT.style;
  } else {
    image.style.filter = `${activeEffect.style}(${sliderValue}${activeEffect.unit})`;
  }
  effectLevelValue.value = sliderValue;
};

const resetEffects = () => {
  activeEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderItem, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});
closeSlider();

effectsItem.addEventListener('change', onEffectsChange);
sliderItem.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
