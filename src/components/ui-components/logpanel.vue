<template>
  <div class="col-xs-12 col-md-12 col-sm-12 col-lg-6 col-xl-3 hidden-md-down full-height-panel">
    <div class="panel panel-default log-panel">
      <div class="panel-body">
        <button v-on:click="clearLog">Clear log</button>
        <div ref="debuglog">
          <div ref="logmsg" v-for="log in logItems" :key="log.id">
            {{ log.header }}
            <pre v-if="log.json">{{ log.json }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logPanel',
  props: {
    logEvents: Array
  },
  computed: {
    logItems() {
      return this.logEvents.slice().reverse();
    }
  },
  methods: {
    clearLog() {
      this.$emit('clear');
    }
  }
};
</script>
<style>
.log-panel {
  border: 0.5px solid #d9d9d9;
  overflow-y: auto;
}

pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
