<template>
  <div class="header">
    <div class="nav-content">
      <div class="oskari-logo"><a href="http://www.oskari.org"><img src="../../assets/img/oskari_logo_white.png" style="height:65px"></img></a></div>
      <nav>
        <ul id="nav navbar-nav" role="navigation">
          <li><a href="/guides">Guides</a></li>
          <li><a href="/documentation">Documentation</a></li>
          <li><a href="/examples">Examples</a></li>
          <li><a href="/download">Download</a></li>
          <li><a href="/about">About</a></li>
          <li><app-input></app-input></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Input from './Input.vue';

export default {
  components: {
    'app-input': Input
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
.header {
  width: 100%;
  background: #262626;
  border-bottom: 1px solid maroon;
  -webkit-box-shadow: 0 5px 20px 0 rgba(0,0,0,.3);
  box-shadow: 0 5px 20px 0 rgba(0,0,0,.3);
}
.header nav {
  font-size: 1.2em;
}
.header nav ul li {
  display: inline-block;
  margin-left: .5em;
  list-style-type: none;
  padding-bottom: 5px;
  border-top: 15px solid transparent;
}
.nav-content {
  max-width: 1200px;
margin-right: auto;
margin-left: auto;
padding: 0 0 2em;
height: 60px;
}
.oskari-logo{
  float:left;
}
#header-items{
  margin: auto;
  font-size:  1.2em;
  display: inline-block;
}
li {
  margin-left: .5em;
  display: inline-block;
}
a {
  color:#e8ecef;
  padding-left: .7em;
  padding-right: .7em;
}
</style>
