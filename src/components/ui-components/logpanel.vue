<template>
<div class="col-xs-12 col-md-12 col-sm-12 col-lg-6 col-xl-4 hidden-md-down full-height-panel">
<div class="panel panel-default log-panel">
  <div class="panel-body">
    <a href="#" v-on:click="clearLog">Clear log</a>
    <div ref="debuglog">
      <div ref="logmsg" v-for="log in logs">{{log.header}}
        <pre v-if="log.json">{{log.json}}</pre>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    // mapgetters is a helper to return your getter functions from the store
    ...mapGetters({
      logs: 'getLogs',
      logmsg: 'getLogMsg'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    clearLog () {
      this.$refs.logmsg.forEach((logmsg) => {
        logmsg.remove();
      });
      this.$store.state.channelLogs = [];
    }
  }
}
</script>
<style>
.full-height-panel {
  height: 98% !important
}
.log-panel {
  height:770px;
  border:0.5px solid #D9D9D9;
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
