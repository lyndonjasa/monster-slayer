<template>
  <div class="login-container">
    <app-loader v-if="isLoading"></app-loader>

    <form>
      <div class="login-form-control">
        <input type="text" 
          class="input-principal" 
          placeholder="Username"
          v-model="username"
          :class="{ error : !$v.username.required && $v.username.$error }"
          @blur="$v.username.$touch()"
        />
      </div>

      <div class="login-form-control">
        <input 
          type="password" 
          class="input-principal" 
          placeholder="Password" 
          v-model="password"
          :class="{ error : !$v.password.required && $v.password.$error }"
          @blur="$v.password.$touch()"
        />
      </div>

      <button style="display: none" @click.prevent="onFormSubmit">Submit</button>
    </form>

    <div class="login-form-control actions">
      <button class="btn-principal" @click="onFormSubmit">Login</button>
      <button class="btn-principal" @click="onSignUp">Sign Up</button>
    </div>

    <div class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import AccountMixin from "../../mixins/AccoutMixin";

export default {
  data: function() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      isLoading: false
    }
  },
  mixins: [AccountMixin],
  validations: {
    username: { required },
    password: { required }
  },
  methods: {
    onFormSubmit: function() {
      this.$v.$touch();

      if (!this.$v.$error) {

        this.isLoading = true;
        this.login(this.username, this.password).then(response => {
          debugger
          if (response.data) {
            this.isLoading = false;
            this.resetForm();
            this.$emit("on-login", response.data.accountId);
          }
        }, err => {
          if (err.body.code === 404) {
            this.errorMessage = err.body.error;
          }

          this.isLoading = false;
        });
      }
    },
    onSignUp: function() {
      this.resetForm();
      this.$emit("sign-up");
    },
    resetForm: function() {
      this.username = "";
      this.password = "";
      this.errorMessage = "";
      this.$v.$reset();
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 300px;
  margin: auto;

  .login-form-control {
    margin-top: 25px;

    .input-principal.error {
      border: 2px solid red;
    }

    &.actions {
      text-align: center;
    }

    .btn-principal {
      width: 125px !important;
      font-size: 12px;
      font-family: AtariClassic;
      margin: 0 5px;
    }
  }

  .error-message {
    text-align: center;
    margin-top: 15px;
  }
}
</style>