<script>
export default {
  data: function() {
    return {
      notification: ""
    }
  },
  methods: {
    writeNotification: function(message) {
      let i = 0;
      let vm = this;
      this.notification = '';

      function typeWriter() {
        if (i < message.length) {
          vm.notification += message.charAt(i);
          i++;
          setTimeout(typeWriter, 20);
        }
      }
      
      typeWriter();
    }
  }
}
</script>