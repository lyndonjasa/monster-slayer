<template>
  <app-layout headerText="Character Status">
    <div class="character-home-screen row nomargin">
      <div class="col-sm-4 nopadding" v-if="character">
        Details Goes Here
      </div>

      <div class="col-sm-8 nopadding" v-if="character">
        Stats Goes Here
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { store } from "../../store";
import AccountMixin from "../../mixins/AccoutMixin";

export default {
  created: function() {
    this.showLoader = true;
    this.getCharacter(this.account).then(res => {
      this.showLoader = false;
      this.character = res;
      store.commit("setCharacter", res._id);
    });
  },
  computed: {
    ...mapGetters({
      account: 'account'
    })
  },
  mixins: [AccountMixin],
  data: function() {
    return {
      character: undefined,
      showLoader: false
    };
  }
}
</script>