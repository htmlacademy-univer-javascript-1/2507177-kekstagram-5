import { generatePhotosArray } from './gallery.js';
import { renderThumbnails } from './thumbnail.js';


export const photosArray = generatePhotosArray();
renderThumbnails(photosArray);

