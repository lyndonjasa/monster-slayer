<script>
import config from "../config";

// const accountsBaseUrl = "http://localhost:3000/accounts";
const accountsBaseUrl = `${config.apiUrl}/accounts`;

export default {
  methods: {
    createAccount: function(account) {
      return this.$http.post(accountsBaseUrl, account).then(response => response.json());
    },
    login: function(username, password) {
      const url = `${accountsBaseUrl}/login`;

      return this.$http.post(url, { username, password }).then(response => response.json());
    },
    getCharacter: function(accountId) {
      const url = `${accountsBaseUrl}/${accountId}/character`;

      return this.$http.get(url).then(response => response.json());
    }
  }
}
</script>