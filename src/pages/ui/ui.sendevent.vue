<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      UIEvent can be used through RPC API to trigger miscellaneous things on the UI such as:
    </p>
    
    <h3>Open/close coordinatetool's popup</h3>

      <CodeSnippet :runnable="true" buttonText="Open/close">
var toolname = 'coordinatetool';
channel.sendUIEvent([toolname], function(data) {
  channel.log('sendUIEvent: ', data);
});
      </CodeSnippet>
    

      <h3>Toggle the map's center crosshair</h3>
    <CodeSnippet :runnable="true" buttonText="Toggle crosshair">
var toolname = 'mapmodule.crosshair';
channel.sendUIEvent([toolname], function(data) {
  channel.log('sendUIEvent: ', data);
});
    </CodeSnippet>
  </div>
</template>
<script>
const title = 'Send UI event';
export default {
  name: 'SendUIEvent',
  label: title,
  data() {
    return {
      title,
      coordinateToolVisible: false,
      crosshairVisible: false
    };
  },
  beforeUnmount() {
    // we can no longer track these with runnable codesnippet,
    //  but we could do something else to track and reset when user leaves the page
    if (this.coordinateToolVisible) {
      this.$root.channel.sendUIEvent(['coordinatetool'], () => {});
    }
    if (this.crosshairVisible) {
      this.$root.channel.sendUIEvent(['mapmodule.crosshair'], () => {});
    }
  }
};
</script>
