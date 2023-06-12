<template>
  <div>
    <div>
      Open/close coordinatetool's popup:
      <RunExampleButton @click="sendUIEvent">SendUIEvent</RunExampleButton>
    </div>
    <CodeSnippet>
var toolname = 'coordinatetool';
channel.sendUIEvent([toolname], function(data) {
  channel.log('sendUIEvent: ', data);
});
    </CodeSnippet>

    <div>
      Toggle the map's center crosshair:
      <RunExampleButton @click="toggleCrosshair">SendUIEvent</RunExampleButton>
    </div>
    <CodeSnippet>
var toolname = 'mapmodule.crosshair';
channel.sendUIEvent([toolname], function(data) {
  channel.log('sendUIEvent: ', data);
});
    </CodeSnippet>
  </div>
</template>
<script>
export default {
  name: 'SendUIEvent',
  label: 'Send UI event',
  data() {
    return {
      desc: 'Send UI event',
      coordinateToolVisible: false,
      crosshairVisible: false
    };
  },
  methods: {
    sendUIEvent() {
      this.$root.channel.sendUIEvent(['coordinatetool'], (data) => {
        this.coordinateToolVisible = !this.coordinateToolVisible;
        this.$root.channel.log('sendUIEvent: ', data);
      });
    },
    toggleCrosshair() {
      this.$root.channel.sendUIEvent(['mapmodule.crosshair'], (data) => {
        this.crosshairVisible = !this.crosshairVisible;
        this.$root.channel.log('sendUIEvent mapmodule.crosshair: ', data);
      });
    }
  },
  beforeUnmount() {
    if (this.coordinateToolVisible) {
      this.$root.channel.sendUIEvent(['coordinatetool'], () => {});
    }
    if (this.crosshairVisible) {
      this.$root.channel.sendUIEvent(['mapmodule.crosshair'], () => {});
    }
  }
};
</script>
