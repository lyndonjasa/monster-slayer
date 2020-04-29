<script>
import config from "../config";

const baseUrl = `${config.apiUrl}/character`;

export default {
  methods: {
    getCharacterById: function(id) {
      return this.$http.get(`${baseUrl}/${id}`).then(res => res.json());
    },
    getInventory: function(characterId) {
      return this.$http.get(`${baseUrl}/${characterId}/inventory`).then(res => res.json());
    }
  }
}
</script>