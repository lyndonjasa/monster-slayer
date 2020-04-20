<template>
  <div class="battlefield-container">
    <div class="battlefield">
      <div class="row nomargin">
        <div class="col-sm-6 nopadding">
          <app-character :character="player"></app-character>
        </div>
        <div class="col-sm-6 nopadding">
          <app-character :character="enemy"></app-character>
        </div>
      </div>
    </div>

    <div class="character-actions row nomargin">
      <div class="col-sm-6 nopadding">
        <div class="actions">
          <app-action-pane
            v-show="!enemyTurn"
            :skills="player.skills"
            @attack="onAttack"
            @focus="onFocus"
            @ability-use="onAbilityUse($event)"
          ></app-action-pane>
        </div>
      </div>
      <div class="col-sm-6 nopadding">
        <div class="actions message-container">
          {{ battleNotification }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Character from "./characters/Character";
import ActionPane from "./actions/ActionPane";
import { enemyAction } from "../shared/ai-script";
import { player, enemy, createPlayer } from "../shared/characters";
import { loadFromStore } from "../shared/storage-helper";

export default {
  components: {
    appCharacter: Character,
    appActionPane: ActionPane
  },
  data() {
    return {
      enemyAction: 0,
      enemyTurn: false,
      player,
      enemy,
      battleNotification: ''
    };
  },
  mounted: function() {
    const gameAccount = loadFromStore("gameAccount");
    if (gameAccount) {
      this.player = createPlayer(gameAccount.character.classType, gameAccount.character.name);
    }
  },
  methods: {
    onAttack: function() {
      this.enemy.actualHealth -= 10;
      this.writeBattleMessage(`${this.player.name} attacked! Dealt 10 hit points!`);
      this.animateAction(this.player);
      this.enemyTurn = true;

      this.enemyAction = setTimeout(() => this.triggerEnemyAction(), 3000);
      this.enemyAction;
    },
    onFocus: function() {
      if (this.player.mana + 20 > this.player.totalMana) {
        this.player.mana = this.player.totalMana
      } else {
        this.player.mana += 20;
      }

      this.writeBattleMessage(`${this.player.name} focused! Regained 20 mana!`);
      this.animateAction(this.player);
      this.enemyTurn = true;

      this.enemyAction = setTimeout(() => this.triggerEnemyAction(), 3000);
      this.enemyAction;
    },
    onAbilityUse: function(skill) {
      if (this.player.mana < skill.cost) {
        this.onFocus();
        return;
      }

      this.player.mana -= skill.cost;
      if (skill.target === "enemy") {
        this.enemy.actualHealth -= skill.damage;
      } else {
        if (this.player.actualHealth - skill.damage > this.player.totalHealth) {
          this.player.actualHealth = this.player.totalHealth;
        } else {
          this.player.actualHealth -= skill.damage;
        }
      }

      const action = skill.damage > 0 ? "Dealt" : "Gained";

      this.writeBattleMessage(`${this.player.name} used ${skill.name}! ${action} ${Math.abs(skill.damage)} hit points!`);
      this.animateAction(this.player);
      this.enemyTurn = true;

      this.enemyAction = setTimeout(() => this.triggerEnemyAction(), 3000);
      this.enemyAction;
    },
    triggerEnemyAction: function() {
      const action = enemyAction(this.enemy.skills, this.enemy.mana);
      const skillUsed = action.skill;

      if (action.action === 1) {
        this.player.actualHealth -= 10;

        this.writeBattleMessage(`${this.enemy.name} attacked! Dealt 10 hit points!`);
        this.animateAction(this.enemy);
      } else if (action.action === 2) {
        if (this.enemy.mana + 20 > this.enemy.totalMana) {
          this.enemy.mana = this.enemy.totalMana
        } else {
          this.enemy.mana += 20;
        }

        this.writeBattleMessage(`${this.enemy.name} focused! Gained 20 mana!`);
        this.animateAction(this.enemy);
      } else {
        this.enemy.mana -= skillUsed.cost;
        if (skillUsed.target === "enemy") {
          this.player.actualHealth -= skillUsed.damage;
        } else {
          if (this.enemy.actualHealth - skillUsed.damage > this.enemy.totalHealth) {
            this.enemy.actualHealth = this.enemy.totalHealth;
          } else {
            this.enemy.actualHealth -= skillUsed.damage;
          }
        }

        const action = skillUsed.damage > 0 ? "Dealt" : "Gained";

        this.writeBattleMessage(`${this.enemy.name} used ${skillUsed.name}! ${action} ${Math.abs(skillUsed.damage)} hit points!`);
        this.animateAction(this.enemy);
      }

      setTimeout(() => this.enemyTurn = false, 3000);
    },
    writeBattleMessage: function(message) {
      if (this.player.actualHealth <= 0) {
        message += ` You lost the battle!`;
      }

      if (this.enemy.actualHealth <= 0) {
        message += ` ${this.enemy.name} has been obliterated!`;
      }

      let i = 0;
      let vm = this;
      this.battleNotification = '';

      function typeWriter() {
        if (i < message.length) {
          vm.battleNotification += message.charAt(i);
          i++;
          setTimeout(typeWriter, 30);
        }
      }
      
      typeWriter();
    },
    animateAction: function(character) {
      var interval = setInterval(() => {
        character.showAlt = !character.showAlt;
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        character.showAlt = false;
      }, 400);
    }
  },
  watch: {
    player: {
      deep: true,
      handler: function(value) {
        if (value.actualHealth <= 0) {
          value.actualHealth = 0;
          clearTimeout(this.enemyAction);
        }
      }
    },
    enemy: {
      deep: true,
      handler: function(value) {
        if (value.actualHealth <= 0) {
          value.actualHealth = 0;
          clearTimeout(this.enemyAction);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.battlefield-container {
  width: 800px;
  margin: auto;

  .battlefield {
    width: 100%;
    height: 400px;
    background-image: url("../assets/images/grass-field.jpg");
  }

  .character-actions {
    width: 100%;
    background-image: linear-gradient(to right, black , darkblue);

    .actions {
      border: 3px solid white;
      border-radius: 5px;
      margin: 5px;
      padding: 5px;
      min-height: 128px;

      &.message-container {
        height: calc(100% - 10px);
        color: white;
        font-family: AtariClassic;
      }
    }
  }
}
</style>