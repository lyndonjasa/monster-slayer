export const classTypes = [
  {
    id: 1,
    name: "Saber",
    image: require('../assets/images/classes/saber.png'),
    details: "Agile and powerful melee warriors adept at swordsmanship",
    weapons: "Swords",
    stats: {
      off: "B",
      def: "C",
      agi: "B",
      int: "D",
      luk: "C"
    }
  },
  {
    id: 2,
    name: "Archer",
    image: require('../assets/images/classes/archer.png'),
    details: "A highly effective scout that deals very powerful piercing strikes",
    weapons: "Bow and Arrow",
    stats: {
      off: "C",
      def: "D",
      agi: "C",
      int: "C",
      luk: "A"
    }
  },
  {
    id: 3,
    name: "Lancer",
    image: require('../assets/images/classes/lancer.png'),
    details: "Very agile warrior that excels on speed and continuous strikes",
    weapons: "Spears/Polearms",
    stats: {
      off: "C",
      def: "D",
      agi: "A",
      int: "D",
      luk: "B"
    }
  },
  {
    id: 4,
    name: "Berserker",
    image: require('../assets/images/classes/berserker.png'),
    details: "Mad warriors who trade speed for strength and extreme tankiness",
    weapons: "Hammers/Bludgeons",
    stats: {
      off: "A",
      def: "S",
      agi: "D",
      int: "D",
      luk: "E"
    }
  },
  {
    id: 5,
    name: "Caster",
    image: require('../assets/images/classes/caster.png'),
    details: "Has low combat abilities but capitalizes on destructive magecraft",
    weapons: "Staffs",
    stats: {
      off: "E",
      def: "D",
      agi: "B",
      int: "S",
      luk: "C"
    }
  }
];

export const itemIcons = [
  {
    classId: 1,
    type: "WPN",
    svg: "SABER-WPN"
  },
  {
    classId: 1,
    type: "AMR",
    svg: "SABER-AMR"
  },
  {
    classId: 2,
    type: "WPN",
    svg: "ARCHER-WPN"
  },
  {
    classId: 2,
    type: "AMR",
    svg: "ARCHER-AMR"
  },
  {
    classId: 3,
    type: "WPN",
    svg: "LANCER-WPN"
  },
  {
    classId: 3,
    type: "AMR",
    svg: "LANCER-AMR"
  },
  {
    classId: 4,
    type: "WPN",
    svg: "BERSERKER-WPN"
  },
  {
    classId: 4,
    type: "AMR",
    svg: "BERSERKER-AMR"
  },
  {
    classId: 5,
    type: "WPN",
    svg: "CASTER-WPN"
  },
  {
    classId: 5,
    type: "AMR",
    svg: "CASTER-AMR"
  }
];