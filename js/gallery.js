import {renderMiniatures} from './miniature.js';
import {openBigPhoto} from './big-photo.js';

const container = document.querySelector('.pictures');

const renderGallery = (photos) => {
  container.addEventListener('click', (evt) => {
    const miniature = evt.target.closest('[data-miniature-id]');
    if (!miniature) {
      return;
    }
    // debugger;
    const photo = photos.find(
      (item) => item.id === +miniature.dataset.miniatureId
    );
    openBigPhoto(photo);
  });

  // renderMiniatures(photos, container);
  // renderMiniatures(container);
  renderMiniatures();
};

export {renderGallery};
