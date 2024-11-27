<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Sets the cursor style on map. The value can be any valid CSS cursor value.
      Note! Not all possible values are supported by all browsers.
    </p>
    <CodeSnippet :runnable="true" buttonText="Set cursor style">
// one of 'default', 'crosshair', 'move', 'pointer', 'progress'
var cursorStyle = 'crosshair';
channel.setCursorStyle([cursorStyle], function(data) {
  channel.log('setCursorStyle: ', data);
});
    </CodeSnippet>
  </div>
</template>
<script>
const title = 'Set cursor style';
export default {
  name: 'setCursorStyle',
  label: title,
  data() {
    return {
      title
    };
  },
  beforeUnmount() {
    this.$root.channel.setCursorStyle(['default'], () => {});
  }
};
</script>
