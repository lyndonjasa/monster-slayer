<template>
  <div class="creation-form">
    <div class="form-container">
      <div class="account-form-container">
        <div class="form-header">
          <span>Account Creation</span>
        </div>
        <app-account-form></app-account-form>
      </div>

      
    </div>
  </div>
</template>

<script>
import AccountForm from "./AccountForm";

export default {
  components: {
    appAccountForm: AccountForm
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

  .form-container {
    color: #E4E1CB;
    margin-top: 100px;

    .form-header {
      text-align: center;

      span {
        font-family: Target3D !important;
        font-size: 25px;
      }
    }
  }
}
</style>