import { classTypes } from "./class-types";
import { skillTree } from "./skill-tree";

export function createPlayer(classId, name) {
  const player = {
    actualHealth: 200,
    totalHealth: 200,
    isPlayer: true,
    mana: 100,
    totalMana: 100,
    name,
    showAlt: false
  }

  const classType = classTypes.find(x => x.id === classId);

  player["image"] = `dist/images/classes/animated/${classType.name}.png`;
  player["altImage"] = `dist/images/classes/animated/${classType.name}-alt.png`;

  player["skills"] = skillTree.find(x => x.classId === classId).skills;

  return player;
}

export function extractPlayer(character) {
  const player = {
    isPlayer: true,
    name: character.name,
    showAlt: false,
    id: character._id
  }

  const className = classTypes.find(x => x.id === character.classType).name.toLowerCase();
  player["image"] = require(`../assets/images/classes/animated/${className}-atk.png`);
  player["altImage"] = require(`../assets/images/classes/animated/${className}-alt.png`);

  player["skills"] = character.skills

  const stats = extractStats(character);
  player.stats = stats
  player.stats.totalHealth = stats.health;
  player.stats.totalMana = stats.mana;

  return player;
}

function extractStats(player) {
  const { stats } = player;
  const { weapon, armor } = player.equipment;

  const totalStats = {};
  const keys = Object.keys(stats);
  keys.forEach(key => {
    totalStats[key] = stats[key] + armor.bonus[key] + weapon.bonus[key];
  });

  return totalStats;
}

export const enemy = {
  actualHealth: 400,
  totalHealth: 400,
  isPlayer: false,
  mana: 200,
  totalMana: 200,
  name: 'Black Dragon',
  image: require('../assets/images/enemies/black-dragon.png'),
  altImage: require('../assets/images/enemies/black-dragon-blink.png'),
  showAlt: false,
  skills: [
    {
      name: 'Dragon Claw',
      damage: 35,
      cost: 30,
      target: 'enemy'
    },
    {
      name: 'Dragon Breath',
      damage: 75,
      cost: 50,
      target: 'enemy'
    },
    {
      name: 'Mega Flare',
      damage: 125,
      cost: 150,
      target: 'enemy'
    }
  ]
};

export function extractEnemy(character) {
  const enemy = {
    image: require(`../assets/images/enemies/${character.image}.png`),
    altImage: require(`../assets/images/enemies/${character.image}-blink.png`),
    isPlayer: false,
    showAlt: false,
    name: character.name,
    id: character._id,
    skills: character.skills,
    stats: character.stats
  };

  character.stats.totalHealth = character.stats.health;
  character.stats.totalMana = character.stats.mana;
  
  return enemy;
}