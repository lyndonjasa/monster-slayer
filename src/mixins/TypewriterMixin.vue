<script>
export default {
  data: function() {
    return {
      notification: ""
    }
  },
  methods: {
    writeNotification: function(message, delay=20) {
      let i = 0;
      let vm = this;
      this.notification = '';

      function typeWriter() {
        if (i < message.length) {
          vm.notification += message.charAt(i);
          i++;
          setTimeout(typeWriter, delay);
        }
      }
      
      typeWriter();
    }
  }
}
</script>