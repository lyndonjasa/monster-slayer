<template>
  <div class="account-form">
    <div class="row nomargin">
      <div class="col-sm-4 nopadding form-label">First Name</div>
      <div class="col-sm-8 nopadding">
        <input type="text" class="input-principal" />
      </div>
    </div>

    <div class="row nomargin">
      <div class="col-sm-4 nopadding form-label">Last Name</div>
      <div class="col-sm-8 nopadding">
        <input type="text" class="input-principal" />
      </div>
    </div>

    <div class="row nomargin">
      <div class="col-sm-4 nopadding form-label">Email</div>
      <div class="col-sm-8 nopadding">
        <input type="text" class="input-principal" />
      </div>
    </div>

    <div class="row nomargin">
      <div class="col-sm-4 nopadding form-label">Username</div>
      <div class="col-sm-8 nopadding">
        <input type="text" class="input-principal" />
      </div>
    </div>

    <div class="row nomargin">
      <div class="col-sm-4 nopadding form-label">Password</div>
      <div class="col-sm-8 nopadding">
        <input type="text" class="input-principal" />
      </div>
    </div>

    <div class="row nomargin">
      <div class="col-sm-4 nopadding form-label">Confirm Password</div>
      <div class="col-sm-8 nopadding">
        <input type="text" class="input-principal" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.account-form {
  width: 400px;
  margin: auto;
  margin-top: 5px;

  .row {
    margin-top: 10px !important;

    .form-label {
      padding-top: 5px !important;
    }
  }
}
</style>