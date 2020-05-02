import { getRandomValueByRange } from "./randomizer";

export class Calculator {
  /**
   * 
   * @param {Number} offense the attacker's offense value.
   * @param {Number} defense the opponent's defense value.
   */
  static calculateDamage(offense, defense) {
    // offense less than 75% defense
    const damage = Math.ceil(offense - (0.75 * defense));

    return damage > 0 ? damage : 1;
  }

  /**
   * 
   * @param {Object} skill the skill used.
   * @param {Number} baseStatValue basis of the damage.
   * @param {Number} defense the opponent's defense.
   */
  static calculateSkillDamage(skill, baseStatValue, defense) {
    const damage = Calculator.calculateDamage(baseStatValue, defense);
    const multiplier = skill.damage / 100;
    const totalDamage = Math.ceil(damage * multiplier);

    return totalDamage;
  }

  /**
   * 
   * @param {Number} proponentAgi 
   * @param {Number} opponentAgi 
   */
  static hasMissed(proponentAgi, opponentAgi) {
    const maxProbability = proponentAgi + (opponentAgi * 0.75);

    const roll = getRandomValueByRange(1, maxProbability);

    return roll <= proponentAgi;
  }

  /**
   * 
   * @param {Number} luk 
   */
  static isCrit(luk) {
    const roll = getRandomValueByRange(1, 100);

    return roll <= Math.ceil(luk * 100);
  }

  /**
   * 
   * @param {Number} int 
   */
  static calculateFocusGain(int) {
    return Math.ceil(0.75 * int);
  }
}

