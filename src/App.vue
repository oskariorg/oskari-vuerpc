<template>
  <div>
    <app-header></app-header>
    <rpc-api></rpc-api>
  </div>
</template>

<script>
  import rpcApi from './components/rpc-api.vue';
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import style from './style.css';
  export default {
    components: {
      'rpc-api': rpcApi
    },
    data () {
      return { }
    }
  }
</script>

<style lang="scss">
@import "~./assets/fonts/fonts_config.scss";

html {
    min-height: 100%;
    font-size: 100%;
}

body {
    background: #D9D9D9;
    font-family: 'Open Sans';
    color: #262626;
}
 p {
    color: #262626;
}
h1 {
    font-family: 'Open Sans';
    font-size: 2rem;
    color: #262626;
    background-color: #D9D9D9;
    padding: 4px;
}

h2 {
    font-family: 'Open Sans' !important;
    font-size: 1.5rem;
    color: #262626;
    background-color: #D9D9D9;
    /*padding: 4px;*/
    padding: 10px;
}

h3 {
    font-family: 'Open Sans';
    font-size: calc(1.25rem + 1.0vh);
    background-color: #F9F9F9;
    /*padding: 4px;*/
    padding: 10px;
}

h4, h5, h6 {
    font-family: 'Open Sans';
    font-size: 1.25rem;
    color: #262626;
}
</style>
