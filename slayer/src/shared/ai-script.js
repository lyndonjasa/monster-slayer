export function enemyAction(skills, currentMana) {
  const currentAction = getRandomInt(2);

  // Attack
  if (currentAction === 1) {
    return {
      action: 1,
      damage: 10,
      skill: undefined
    };
  } else { // skill
    const skillIndex = getRandomInt(skills.length);

    // insufficient mana
    if (skills[skillIndex].cost > currentMana) {
      return {
        action: 2,
        damage: 0,
        skill: undefined
      };
    } else {
      return {
        action: 3,
        damage: 0,
        skill: skills[skillIndex]
      }
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}