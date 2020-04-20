import { classTypes } from "./class-types";
import { skillTree } from "./skill-tree";

export const player = {
  actualHealth: 200,
  totalHealth: 200,
  isPlayer: true,
  mana: 100,
  totalMana: 100,
  name: 'Warrior of Light',
  image: 'src/assets/images/warrior.png',
  altImage: 'src/assets/images/warrior-blink.png',
  showAlt: false,
  skills: [
    {
      name: 'Dash Slash',
      damage: 25,
      cost: 20,
      target: 'enemy'
    },
    {
      name: 'Iai Strike',
      damage: 75,
      cost: 50,
      target: 'enemy'
    },
    {
      name: 'Heal',
      damage: -50,
      cost: 30,
      target: 'self'
    }
  ]
};

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

  player["image"] = `src/assets/images/classes/${classType.name}.png`;
  player["altImage"] = `src/assets/images/classes/${classType.name}-blink.png`;

  player["skills"] = skillTree.find(x => x.classId === classId).skills;

  return player;
}

export const enemy = {
  actualHealth: 400,
  totalHealth: 400,
  isPlayer: false,
  mana: 200,
  totalMana: 200,
  name: 'Dragon of Shmargonrog',
  image: 'src/assets/images/black-dragon.png',
  altImage: 'src/assets/images/black-dragon-blink.png',
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