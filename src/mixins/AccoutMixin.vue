<script>
const accountsBaseUrl = "http://localhost:3000/accounts";

export default {
  methods: {
    createAccount: function(account) {
      return this.$http.post(accountsBaseUrl, account);
    },
    login: function(username, password) {
      const url = `${accountsBaseUrl}/login`;

      return this.$http.post(url, { username, password });
    },
    getCharacter: function(accountId) {
      const url = `${accountsBaseUrl}/${accountId}/character`;

      return this.$http.get(url).then(response => response.json());
    }
  }
}
</script>