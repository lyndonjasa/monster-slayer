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
    },
    updateEquipment: function(characterId, request) {
      return this.$http.put(`${baseUrl}/${characterId}/equipment`, request);
    },
    deleteItem: function(characterId, inventoryId) {
      return this.$http.delete(`${baseUrl}/${characterId}/inventory/${inventoryId}`);
    },
    getCharacterSkills: function(characterId) {
      return this.$http.get(`${baseUrl}/${characterId}/skills`).then(res => res.json());
    },
    updateSkills: function(characterId, request) {
      return this.$http.put(`${baseUrl}/${characterId}/skills`, request);
    },
    getDungeonAccess: function(characterId) {
      return this.$http.get(`${baseUrl}/${characterId}/dungeons`).then(res => res.json());
    }
  }
}
</script>