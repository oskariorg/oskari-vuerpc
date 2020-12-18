<template>
  <div>
    <Documentation-site-top-bar />
    <div class="wrapper">
      <div class="row">
        <EmbeddedMap ref="mapElement" :domain="oskariDomain" :uuid="embeddedMapUUID" />
        <ActionPanel :currentPage="currentPage" />
        <LogPanel ref="logElement" />
      </div>
      <div class="msg" ref="messageBox"></div>
    </div>
  </div>
</template>

<script>
  import OskariRPC from 'oskari-rpc';

  import Header from './components/ui-components/Header.vue';

  import EmbeddedMap from './components/ui-components/embedded-map.vue';
  import ActionPanel from './components/ui-components/actionpanel.vue';
  import LogPanel from './components/ui-components/logpanel.vue';
  import { createLogger, createOnReady } from './util/channelLogger';
  import { eventHandlers } from './util/eventHandlers.js';
  import EVENTBUS from './util/eventbus.js';

  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import style from './style.css';

  export default {
    components: {
      'Documentation-site-top-bar': Header,
      'EmbeddedMap': EmbeddedMap,
      'ActionPanel': ActionPanel,
      'LogPanel': LogPanel
    },
    data () {
      return {
        oskariDomain: 'https://kartta.paikkatietoikkuna.fi',
        embeddedMapUUID: '053027f4-91d9-4351-aec4-c6a31dd68c56',
        expectedOskariVersion: '2.1.0',
        currentPage: this.$route
       }
    },
    watch:{
      $route (to, from) {
        // required: listen to route change so we can update current page -> update navigation outside <router-view />
        this.currentPage = to;
      }
    },
    created () {
      // Set these up when created so they are available for
      // components when accessed through non-root router path
      this.$root.documentPathRequest = 'https://oskari.org/api/requests#' + this.expectedOskariVersion + '/';
      this.$root.documentPathEvent = 'https://oskari.org/api/events#' + this.expectedOskariVersion + '/';
      this.$root.documentationLinks = {
        base: 'https://oskari.org/api',
        event: '/events#' + this.expectedOskariVersion + '/',
        request: '/requests#' + this.expectedOskariVersion + '/',
        bundle: '/bundles#' + this.expectedOskariVersion + '/'
      }
    },
    mounted () {
        const channel = OskariRPC.connect(
          this.$refs.mapElement.getIframeElement(),
          this.oskariDomain
        );
        // expose channel as global variable so it can be accessed from dev-console
        channel.log = createLogger(this.$store.state.channelLogs);
        createOnReady(channel, this.expectedOskariVersion);
        // Note: this != this.$root
        this.$root.channel = channel;
        window.channel = channel;
        EVENTBUS.initChannelListeners(channel);
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
