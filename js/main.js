import {renderGallery} from './gallery.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {setOnFormSubmit, closeModal} from './form.js';

// setOnFormSubmit(async (data) => {
//   try {
//     await sendData(data);
//     closeModal();
//   } catch {
//     // showErrorMessage();
//   }
// });

setOnFormSubmit(async (data) => {
  await sendData(data);
  closeModal();
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
