<template>
  <div class="creation-form">
    <div class="form-container">
      <div class="account-form-container" v-if="isOnAccountCreation">
        <div class="form-header">
          <span>Account Creation</span>
        </div>
        <app-account-form 
          v-if="isOnAccountCreation"
          v-model="gameAccount.account"
          @account-submitted="onAccountSubmitted"
        >
        </app-account-form>
      </div>

      <div class="character-form-container" v-if="!isOnAccountCreation">
        <div class="form-header">
          <span>Character Creation</span>
        </div>

        <app-character-form
          v-model="gameAccount.character"
          @character-submitted="onCharacterSubmitted"
        >
        </app-character-form>
      </div>
    </div>

    <div class="form-footer row nomargin">
      <div class="col-sm-6 nopadding left">
        <v-icon icon="angle-double-left" v-if="!isOnAccountCreation" @click="onAccountPrev" />
      </div>
      <div class="col-sm-6 nopadding right">
        <v-icon icon="angle-double-right" v-if="isOnAccountCreation" @click="onAccountNext" />
        <v-icon icon="check-double" v-if="!isOnAccountCreation" @click="onCharacterCreation" />
      </div>
    </div>
  </div>
</template>

<script>
import AccountForm from "./AccountForm";
import CharacterForm from "./CharacterForm";
import { bus } from "../../shared/event-bus";

export default {
  components: {
    appAccountForm: AccountForm,
    appCharacterForm: CharacterForm
  },
  data: function() {
    return {
      isOnAccountCreation: false,
      gameAccount: {
        account: {
          fullName: "",
          email: "",
          username: "",
          password: "",
        },
        character: {
          name: "",
          classType: 0
        }
      },
    };
  },
  methods: {
    onAccountNext: function() {
      bus.$emit("on-account-next");
    },
    onAccountSubmitted: function() {
      this.isOnAccountCreation = false;
    },
    onAccountPrev: function() {
      this.isOnAccountCreation = true;
    },
    onCharacterCreation: function() {
      bus.$emit("on-character-creation");
    },
    onCharacterSubmitted: function() {
      alert("character submitted");
      console.log(this.gameAccount);
    }
  }
}
</script>

<style lang="scss" scoped>
.creation-form {
  width: 800px;
  height: 554px;
  margin: auto;
  background-image: url("../../assets/images/form-background.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  overflow: auto;
  color: #E4E1CB;

  .form-container {
    margin-top: 100px;
    height: 360px;

    .form-header {
      text-align: center;

      span {
        font-family: Target3D !important;
        font-size: 25px;
      }
    }
  }
  
  .form-footer {
    width: 600px;
    margin: auto !important;
    font-size: 40px;
    margin-top: 15px !important;

    div > * {
      cursor: pointer;
    }
  }
}
</style>