<script>
import config from "../config";

const baseUrl = `${config.apiUrl}/dungeons`;

export default {
  methods: {
    enterDungeon: function(dungeonId, characterId) {
      return this.$http.post(`${baseUrl}/enter`, { dungeonId, characterId }).then(res => res.json());
    }
  }
}
</script>