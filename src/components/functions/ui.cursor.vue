<template>
  <div id="setCursorStyle">
    <div>
      <p>
        Sets the cursor style on map. The value can be any valid css cursor value. Not all possible values are supported by all browsers.
      </p>
      <select id="setCursorStyleSelect" v-model="selected">
        <option value="default" selected>default</option>
        <option value="crosshair">crosshair</option>
        <option value="move">move</option>
        <option value="pointer">pointer</option>
        <option value="progress">progress</option>

      </select>
      <button id="btnSetCursorStyle"
      class="btn btn-primary exampleready" @click="setCursorStyle">Set cursor style</button>
    </div>
    <CodeSnippet>
var cursorStyle = jQuery('#setCursorStyleSelect').val();
channel.setCursorStyle([cursorStyle], function(data) {
  channel.log('setCursorStyle: ', data);
});
    </CodeSnippet>

  </div>
</template>
<script>
export default {
  name: 'setCursorStyle',
  label: 'Set cursor style',
  data () {
    return {
      desc: 'Set cursor style',
      selected: ''
    }
  },
  methods: {
    setCursorStyle () {
      const cursorStyle = this.selected
      this.$root.channel.setCursorStyle([cursorStyle], (data) => {
        this.$root.channel.log('setCursorStyle: ', data)
      })
    }
  }
  ,
  beforeUnmount() {
    this.$root.channel.setCursorStyle(['default'], () => {})
  }
}
</script>
