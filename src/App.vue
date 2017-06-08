<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import rpcApi from './components/rpc-api.vue';
  import 'bootstrap/dist/css/bootstrap.css';
  export default {
    components: {
      'rpc-api': rpcApi
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
@font-face {
    font-family: 'Open Sans';
    src: url('./assets/OpenSans-Regular.ttf');
}

html {
    min-height: 100%;
}

body {
    background: #D9D9D9;
}

body, p {
    font-family: Open Sans;
    font-size: 17px;
    color: #262626;
}
h1 {
    font-family: Open Sans;
    color: #262626;
    background-color: #D9D9D9;
    padding: 4px;
}

h2 {
    font-family: Open Sans !important;
    font-size: 24px;
    color: #262626;
    background-color: #D9D9D9;
    /*padding: 4px;*/
    padding: 10px;
}

h3 {
    font-family: Open Sans;
    font-size: 20px;
    background-color: #F9F9F9;
    /*padding: 4px;*/
    padding: 10px;
}

h4, h5, h6 {
    font-family: Open Sans;
    font-size: 20px;
    color: #262626;
}
</style>
