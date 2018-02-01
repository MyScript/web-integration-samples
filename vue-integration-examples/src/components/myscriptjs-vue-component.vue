<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="writing-container" ref="editor"></div>
  </div>
</template>

<script>
import * as MyScriptJS from 'myscript/src/myscript';

export default {
  name: 'MyScriptJSVueComponent',
  data() {
    return {
      msg: 'Basic example of vue integration of MyScriptJS',
    };
  },
  created() {
    // eslint-disable-next-line
    console.log("Created" + this.$refs['editor']);
  },
  mounted() {
    // Fired every second, should always be true
    // eslint-disable-next-line
    console.log("Mounted " + this.$refs['editor']);
    MyScriptJS.register(this.$refs.editor, {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: 'xxxx-xxxx-xxxx-xxxx',
          hmacKey: 'xxxx-xxxx-xxxx-xxxx',
        },
      },
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('myscript/dist/myscript.min.css');
h1,
h2 {
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
