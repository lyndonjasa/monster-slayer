/**
 * 
 * @param {Array<String>} images 
 */
export const loadImages = (images) => {
  return new Promise((resolve, reject) => {
    let imageLoaded = 0;
    images.forEach(image => {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        imageLoaded++;

        if (imageLoaded === images.length) {
          resolve();
        }
      }
    });
  });
}