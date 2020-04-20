<template>
  <div class="account-form">
    <form>
      <div class="row nomargin">
        <div class="col-sm-4 nopadding form-label">Full Name</div>
        <div class="col-sm-8 nopadding">
          <input type="text" class="input-principal" v-model.lazy="fullName" @blur="$v.fullName.$touch()" />
        </div>

        <div class="col-sm-8 offset-sm-4 nopadding">
          <p v-show="!$v.fullName.required && $v.fullName.$dirty">Full Name is required</p>
        </div>
      </div>

      <div class="row nomargin">
        <div class="col-sm-4 nopadding form-label">Email</div>
        <div class="col-sm-8 nopadding">
          <input type="text" class="input-principal" v-model.lazy="email" @blur="$v.email.$touch()" />
        </div>

        <div class="col-sm-8 offset-sm-4 nopadding">
          <p v-show="!$v.email.required && $v.email.$dirty">Email is required</p>
        </div>
      </div>

      <div class="row nomargin">
        <div class="col-sm-4 nopadding form-label">Username</div>
        <div class="col-sm-8 nopadding">
          <input type="text" class="input-principal" v-model.lazy="username" @blur="$v.username.$touch()" />
        </div>

        <div class="col-sm-8 offset-sm-4 nopadding">
          <p v-show="!$v.username.required && $v.username.$dirty">Username is required</p>
          <p v-show="!$v.username.minLength && $v.username.$dirty">Username must be at least 6 characters</p>
        </div>
      </div>

      <div class="row nomargin">
        <div class="col-sm-4 nopadding form-label">Password</div>
        <div class="col-sm-8 nopadding">
          <input type="password" class="input-principal" v-model.lazy="password" @blur="$v.password.$touch()" />
        </div>

        <div class="col-sm-8 offset-sm-4 nopadding">
          <p v-show="!$v.password.required && $v.password.$dirty">Password is required</p>
          <p v-show="!$v.password.minLength && $v.username.$dirty">Password must be at least 6 characters</p>
        </div>
      </div>

      <button v-show="false" @click.prevent="onFormSubmit">Submit</button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { bus } from "../../shared/event-bus";

export default {
  props: ["value"],
  mounted: function() {
    bus.$on("on-account-next", () => {
      this.onFormSubmit();
    });
  },
  data: function() {
    return {
      fullName: this.value.fullName,
      email: this.value.email,
      username: this.value.username,
      password: this.value.password
    }
  },
  validations: {
    fullName: { required },
    email: { required, email },
    username: { required, minLength: minLength(6) },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    onFormSubmit: function() {
      this.$v.$touch();

      if (!this.$v.$error) {
        const formData = {
          fullName: this.fullName,
          email: this.email,
          username: this.username,
          password: this.password
        };

        this.$emit("input", formData);
        this.$emit("account-submitted");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.account-form {
  width: 400px;
  margin: auto;
  margin-top: 5px;

  .row {
    .form-label {
      padding-top: 5px !important;
    }

    &.nomargin {
      margin-bottom: 10px !important;
    }
  }

  p {
    font-size: 10px;
    margin-top: 0px;
    margin-bottom: 0px;
    text-indent: 3px;
  }
}
</style>