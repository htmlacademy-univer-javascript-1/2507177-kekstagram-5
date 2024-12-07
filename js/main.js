import { generatePhotosArray } from './gallery.js';
import { thumbnail } from './thumbnail.js';

export const photosArray = generatePhotosArray();
thumbnail(photosArray);
