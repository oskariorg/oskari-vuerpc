<template>
  <div>
    <documentation-site-top-bar />
    <div class="wrapper">
      <div class="row">
        <embedded-map ref="mapElement" :domain="domain" :uuid="uuid" />
        <rpc-actions />
        <oskari-log ref="logElement" />
      </div>
      <div class="msg" ref="messageBox"></div>
    </div>
  </div>
</template>

<script>
  import OskariRPC from 'oskari-rpc';

  import Header from './components/ui-components/Header.vue';
  import contentLayout from './components/main-layout.vue';

  import EmbeddedMap from './components/ui-components/embedded-map.vue';
  import ActionPanel from './components/ui-components/actionpanel.vue';
  import LogPanel from './components/ui-components/logpanel.vue';
  import { createLogger, createOnReady } from './util/channelLogger';

  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import style from './style.css';

const domain = 'https://kartta.paikkatietoikkuna.fi';

  export default {
    components: {
      'documentation-site-top-bar': Header,
      'embedded-map': EmbeddedMap,
      'rpc-actions': ActionPanel,
      'oskari-log': LogPanel
    },
    data () {
      return {
        domain,
        uuid: '053027f4-91d9-4351-aec4-c6a31dd68c56'
       }
    },
    methods: {
      initConnection () {
        const channel = OskariRPC.connect(
          this.$refs.mapElement.getIframeElement(),
          domain
        );
        // expose channel as global variable so it can be accessed from dev-console
        channel.log = createLogger(me.$store.state.channelLogs);
        createOnReady(channel, '2.0.0');
        // Note: this != this.$root
        this.$root.channel = channel;
        window.channel = channel;
        //this.initLogging();
      },
      exposeDocumentationPaths () {
        this.$root.documentPathRequest = '/api/requests#latest/';
        this.$root.documentPathEvent = '/api/events#latest/';
      }
    },
    mounted () {
      //this.$root.logdiv = this.$refs.logElement.getLogElement();
      this.initConnection();
      this.exposeDocumentationPaths();
    } 
  }
</script>

<style lang="scss">
@import "~./assets/main.scss";
.msg {
  top: 50%;
  left: 38%;
  position: absolute;
  background-color: rgba(255, 0, 0, 0.3);
  box-shadow: 5px 5px 5px #888888;
}
.wrapper {
    position:absolute; 
    width: 98%;
    margin-left: 0;
    margin-right: 0;
    height:100%;
    font-size: calc(0.60rem + 1.0vh);
}
.row {
  height:800px !important;
  padding-left: 1em;
}
.full-height-panel {
  height: 98% !important;
}
.panel-body {
  padding: 1em !important;
}
</style>
