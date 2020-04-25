<template>
  <div class="app-form">
    <app-loader v-if="isLoading"></app-loader>

    <div class="login-form">
      <div class="form-container" v-if="isOnLoginScreen">
        <div class="form-header">
          <span>Login</span>
        </div>

        <app-login-form 
          @sign-up="isOnLoginScreen = false"
          @on-login="login($event)"
        >
        </app-login-form>
      </div>
    </div>
    <div class="creation-form" v-if="!isOnLoginScreen">
      <div class="form-container">
        <div class="account-form-container" v-if="isOnAccountCreationForm">
          <div class="form-header">
            <span>Account Creation</span>
          </div>
          <app-account-form 
            v-if="isOnAccountCreationForm"
            v-model="gameAccount.account"
            @account-submitted="onAccountSubmitted"
          >
          </app-account-form>
        </div>

        <div class="character-form-container" v-if="!isOnAccountCreationForm">
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
          <v-icon icon="angle-double-left" v-if="!isOnAccountCreationForm" @click="onAccountPrev" />
          <v-icon icon="times" v-if="isOnAccountCreationForm && !isOnLoginScreen" @click="onAccountCancel" />
        </div>
        <div class="col-sm-6 nopadding right">
          <v-icon icon="angle-double-right" v-if="isOnAccountCreationForm" @click="onAccountNext" />
          <v-icon icon="check-double" v-if="!isOnAccountCreationForm" @click="onCharacterCreation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountForm from "./AccountForm";
import CharacterForm from "./CharacterForm";
import LoginForm from "./LoginForm";
import { bus } from "../../shared/event-bus";
import { saveToLocalStore } from "../../shared/storage-helper";
import AccountMixin from "../../mixins/AccoutMixin";

export default {
  components: {
    appAccountForm: AccountForm,
    appCharacterForm: CharacterForm,
    appLoginForm: LoginForm
  },
  mixins: [AccountMixin],
  data: function() {
    return {
      isOnLoginScreen: true,
      isOnAccountCreationForm: true,
      isLoading: false,
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
      this.isOnAccountCreationForm = false;
    },
    onAccountPrev: function() {
      this.isOnAccountCreationForm = true;
    },
    onCharacterCreation: function() {
      bus.$emit("on-character-creation");
    },
    onAccountCancel: function() {
      this.isOnLoginScreen = true;
    },
    onCharacterSubmitted: function() {
      this.isLoading = true;
      const accountData = {
        fullName: this.gameAccount.account.fullName,
        email: this.gameAccount.account.email,
        username: this.gameAccount.account.username,
        password: this.gameAccount.account.password,
        characterName: this.gameAccount.character.name,
        classType: this.gameAccount.character.classType
      };

      this.createAccount(accountData).then(response => {
        this.$emit("account-created", response.accountId);
        this.isLoading = false;
        alert("character submitted");
      });
    },
    login: function(accountId) {
      this.$emit("on-login", accountId);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-form {
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