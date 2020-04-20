<template>
  <div class="creation-form">
    <div class="form-container">
      <div class="account-form-container" v-if="isOnAccountCreation">
        <div class="form-header">
          <span>Account Creation</span>
        </div>
        <app-account-form 
          v-if="isOnAccountCreation"
          :form-data="gameAccount.account"
          v-model="gameAccount.account"
          @account-submitted="onAccountSubmitted"
        >
        </app-account-form>
      </div>

      <div class="character-form-container" v-if="!isOnAccountCreation">
        <div class="form-header">
          <span>Character Creation</span>
        </div>

        <app-character-form></app-character-form>
      </div>
    </div>

    <div class="form-footer row nomargin">
      <div class="col-sm-6 nopadding left">
        <v-icon icon="angle-double-left" v-if="!isOnAccountCreation" />
      </div>
      <div class="col-sm-6 nopadding right">
        <v-icon icon="angle-double-right" v-if="isOnAccountCreation" @click="onAccountNext" />
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
      isOnAccountCreation: true,
      gameAccount: {
        account: {
          fullName: "",
          email: "",
          username: "",
          password: "",
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