<template>
  <div class="main-battle-container">
    <app-loader v-if="showLoader" loadingMessage="Now Loading"></app-loader>
    <app-dungeon-re-enter v-if="showReEnterOptions" @re-enter="onReEnter($event)"></app-dungeon-re-enter>
    <app-outcome-pane v-if="showOutcomePane" :outcome="battleOutcome" @close="onOutcomeClose"></app-outcome-pane>

    <app-battle-stage v-if="dungeon" :image="dungeon.image">
      <div class="dungeon-field row nomargin">
        <div class="col-sm-6 nopadding">
          <app-combatant :combatant="player"></app-combatant>
        </div>
        <div class="col-sm-6 nopadding">
          <app-combatant :combatant="enemy"></app-combatant>
        </div>
      </div>
    </app-battle-stage>

    <app-action-pane v-if="playerTurn && player" 
      :skills="player.skills"
      :mana="player.stats.mana"
      @attack="playerAttack"
      @focus="playerFocus"
      @activate-skill="playerActivateSkill"
      @run-away="showReEnterOptions = true">
    </app-action-pane>

    <div class="pane row nomargin">
      <div class="col-sm-3 nopadding">
        <app-status-pane v-if="player" :stats="player.stats"></app-status-pane>
      </div>
      <div class="col-sm-9 nopadding">
        <app-battle-notification :message="battleMessage">
        </app-battle-notification>
      </div>
    </div>
  </div>
</template>

<script>
import BattleStage from "./BattleStage";
import Combatant from "./Combatant";
import BattleNotification from "./BattleNotification";
import ActionPane from "./ActionPane";
import StatusPane from "./StatusPane";
import { Calculator } from "../../../shared/damage-calculator";
import { getRandomInt } from "../../../shared/randomizer";
import DungeonReEnter from "./DungeonReEnter";
import OutcomePane from "./OutcomePane";

export default {
  components: {
    appBattleStage: BattleStage,
    appCombatant: Combatant,
    appBattleNotification: BattleNotification,
    appActionPane: ActionPane,
    appStatusPane: StatusPane,
    appDungeonReEnter: DungeonReEnter,
    appOutcomePane: OutcomePane
  },
  props: {
    dungeon: { required: true },
    enemy: { required: true },
    player: { required: true }
  },
  data: function() {
    return {
      battleMessage: "",
      playerTurn: true,
      enemyAction: 0,
      playerAction: 0,
      showReEnterOptions: false,
      showOutcomePane: false,
      showLoader: false,
      battleOutcome: undefined
    }
  },
  computed: {
    playerStats: function() {
      return this.player.stats;
    },
    enemyStats: function() {
      return this.enemy.stats;
    }
  },
  mounted: function() {
    if (this.enemyStats.agi > this.playerStats.agi) {
      this.react(1000);
    }
  },
  methods: {
    onReEnter: function(condition) {
      if (condition) { // re-enter
        this.$router.go();
      } else { // back to dungeons screen
        this.$router.push("/dungeons");
      }
    },
    onOutcomeClose: function() {
      this.showOutcomePane = false;
      this.showReEnterOptions = true;
    },
    // Attack Command
    playerAttack: function() {
      this.attack(this.player, this.enemy);
      this.react(2000);
    },
    // Focus Command
    playerFocus: function() {
      this.focus(this.player);
      this.react(2000);
    },
    // Activate Skill
    playerActivateSkill: function(skill) {
      this.activateSkill(this.player, skill, this.enemy);
      this.react(2000);
    },
    react: function(timeout) {
      this.playerTurn = false;
      this.enemyAction = setTimeout(() => this.triggerEnemyAction(), timeout);
      this.enemyAction;
    },
    triggerEnemyAction: function() {
      // 0 Attack
      // 1 Use Skill
      const currentAction = getRandomInt(2);
      if (currentAction === 0) {
        this.attack(this.enemy, this.player); // Attack
      } else {
        const skillIndex = getRandomInt(this.enemy.skills.length);
        if (this.enemy.skills[skillIndex].cost > this.enemyStats.mana) {
          this.focus(this.enemy); // Focus
        } else {
          this.activateSkill(this.enemy, this.enemy.skills[skillIndex], this.player);
        }
      }

      this.playerAction = setTimeout(() => { this.playerTurn = true; }, 2000);
      this.playerAction;
    },
    attack: function(character, opponent) {
      this.animateAction(character);
      let message = `${character.name} attacked! `;
      // check if attack misses
      if (!Calculator.hasMissed(character.stats.agi, opponent.stats.agi)) {
        message += `Missed!`
      } else {
        let damage = Calculator.calculateDamage(character.stats.off, opponent.stats.def);
        // check if critical hit
        if (Calculator.isCrit(character.stats.luk)) {
          damage = Math.ceil(damage * 1.5);
          message += `Dealt ${damage} CRIT!`;
        } else {
          message += `Dealt ${damage} hit points!`;
        }

        opponent.stats.health -= damage;
      }

      this.writeBattleMessage(message);
    },
    focus: function(character) {
      this.animateAction(character);
      let message = `${character.name} focused! `;
      let focus = Calculator.calculateFocusGain(character.stats.int);
      // override focus points
      if ((character.stats.mana + focus) > character.stats.totalMana) {
        character.stats.mana = character.stats.totalMana;
      } else {
        character.stats.mana += focus;
      }

      message += `Gained ${focus} mana.`;
      this.writeBattleMessage(message);
    },
    // General Activate Skill
    activateSkill: function(character, skill, opponent) {
      this.animateAction(character);
      let message = `${character.name} used ${skill.name}! `;
      character.stats.mana -= skill.cost;
      // check if attack misses
      if (!Calculator.hasMissed(character.stats.agi, opponent.stats.agi) && skill.target == "enemy") {
        message += `Missed!`
      } else if (skill.target == "self") { // support skills
        const dmgBasis = skill.type == "P" ? character.stats.off : character.stats.int;
        const points = Calculator.calculateSkillDamage(skill, dmgBasis, 0);
        character.stats.health -= points;
        if (character.stats.health > character.stats.totalHealth) {
          character.stats.health = character.stats.totalHealth;
        }

        message += `Gained ${Math.abs(points)} hit points!`;
      } else {
        // check if skills is physical or magical
        const dmgBasis = skill.type == "P" ? character.stats.off : character.stats.int;
        let damage = Calculator.calculateSkillDamage(skill, dmgBasis, opponent.stats.def);
        // reset to 0 if negative
        damage = damage > 0 ? damage : 0;
        // check if critical hit
        if (Calculator.isCrit(character.stats.luk)) {
          damage = Math.ceil(damage * 1.5);
          message += `Dealt ${damage} CRIT!`;
        } else {
          message += `Dealt ${damage} hit points!`;
        }

        opponent.stats.health -= damage;
      }

      this.writeBattleMessage(message);

    },
    animateAction: function(character) {
      var interval = setInterval(() => {
        character.showAlt = !character.showAlt;
      }, 150);

      setTimeout(() => {
        clearInterval(interval);
        character.showAlt = false;
      }, 600);
    },
    writeBattleMessage: function(message) {
      if (this.playerStats.health <= 0) {
        message += " You lost the battle!";
      }

      if (this.enemyStats.health <= 0) {
        message += " Enemy obliterated!";
      }

      this.battleMessage = message;
    }
  },
  watch: {
    enemy: {
      deep: true,
      handler: function(value) {
        if (value.stats.health <= 0) {
          value.stats.health = 0;
          clearTimeout(this.enemyAction);

          setTimeout(() => {
            // add call for levelup
            // this.showReEnterOptions = true;
            this.battleOutcome = {
              exp: 700,
              lvlUp: false,
              drop: "",
              newSkills: [],
              unlockedDungeons: []
            }

            this.showOutcomePane = true;
          }, 2000);
        }
      }
    },
    player: {
      deep: true,
      handler: function(value) {
        if (value.stats.health <= 0) {
          value.stats.health = 0;
          this.playerTurn = false;
          clearTimeout(this.playerAction);

          setTimeout(() => {
            this.showReEnterOptions = true;
          }, 2000);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-battle-container {
  height: 100%;

  .dungeon-field {
    width: 100%;
    height: 400px;
  }
}
</style>