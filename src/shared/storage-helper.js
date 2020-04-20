/**
 * @param {String} key key to get from store
 * @param {Object} data the object to store as JSON string
 */
export function saveToLocalStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * 
 * @param {String} key the key to load from store 
 */
export function loadFromStore(key) {
  return JSON.parse(localStorage.getItem(key));
}