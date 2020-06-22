<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="writing-container" touch-action="none" ref="editor"></div>
  </div>
</template>

<script>
import iink from 'iink-js'

export default {
  name: 'Editor',
  data () {
    return {
      msg: 'Basic example of vue integration of iinkJS'
    }
  },
  mounted () {
    this.editor = iink.register(this.$refs.editor, {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: 'f1355ec8-c74a-4da9-8d63-691ab05952eb',
          hmacKey: '752acf37-5a45-481b-9361-fcb32cd7f6a1'
        }
      }
    })
  },
  destroyed () {
    // don't forget to close websocket when not need it anymore
    this.editor.close()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.writing-container {
  min-height: 600px;
  min-width: 300px;
}
</style>
