<template>
  <div>
    <div>
      <p>
        Sets the cursor style on map. The value can be any valid css cursor value. Not all possible
        values are supported by all browsers.
      </p>
      <b-dd text="Select cursor style" variant="outline-dark" style="padding-left: 1em">
        <b-dd-item-button v-for="(cursor, id) in cursorStyles" :key="id" @click="setCursor(cursor)">
          {{ cursor }}
        </b-dd-item-button>
      </b-dd>
    </div>
    <CodeSnippet :runnable="true" buttonText="Set cursor style">
var cursorStyle = '{{ selected }}';
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
  data() {
    return {
      desc: 'Set cursor style',
      selected: 'default',
      cursorStyles: ['default', 'crosshair', 'move', 'pointer', 'progress']
    };
  },
  methods: {
    setCursor(cursor) {
      this.selected = cursor;
    }
  },
  beforeUnmount() {
    this.$root.channel.setCursorStyle(['default'], () => {});
  }
};
</script>
