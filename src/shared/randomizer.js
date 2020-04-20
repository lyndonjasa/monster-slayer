/**
 * @param {Number} max Maximum random value.
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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