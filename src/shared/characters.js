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
  debugger
  const player = {
    actualHealth: character.stats.health,
    totalHealth: character.stats.health,
    isPlayer: true,
    mana: character.stats.mana,
    totalMana: character.stats.mana,
    name: character.name,
    showAlt: false
  }

  const className = classTypes.find(x => x.id === character.classType).name.toLowerCase();

  player["image"] = `dist/images/classes/animated/${className}.png`;
  player["altImage"] = `dist/images/classes/animated/${className}-alt.png`;

  player["skills"] = character.skills

  return player;
}

export const enemy = {
  actualHealth: 400,
  totalHealth: 400,
  isPlayer: false,
  mana: 200,
  totalMana: 200,
  name: 'Black Dragon',
  image: 'dist/images/enemies/black-dragon.png',
  altImage: 'dist/images/enemies/black-dragon-blink.png',
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