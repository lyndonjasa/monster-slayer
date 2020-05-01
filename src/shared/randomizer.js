/**
 * @param {Number} max Maximum random value (Exclusive).
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * @param {Number} min Minimum random value (Inclusive).
 * @param {Number} max Maximum random value (Inclusive).
 */
export function getRandomValueByRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {Number} minRange Minimum damange.
 * @param {Number} maxRange Maximum damage.
 */
export function getRandomDamage(minRange, maxRange) {
  const diff = maxRange - minRange;

  const randomRange = getRandomInt(maxRange) + 1;

  return minRange + randomRange;
}