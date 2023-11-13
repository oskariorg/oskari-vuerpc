<template>
  <div class="header">
    <div class="nav-container">
      <div class="nav-content">
        <div class="oskari-logo">
          <a href="http://www.oskari.org"
            ><img src="../../assets/img/oskari_logo_black_horizontal.svg" style="height: 3rem"
          /></a>
        </div>
        <nav>
          <ul id="nav" role="navigation">
            <li><a href="/guides">Guides</a></li>
            <li><a href="/documentation">Documentation</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/download">Download</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
        <button id="nav-download">Download</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pageHeader',
  data() {
    return {};
  }
};
</script>
<style>
.nav-container {
  max-width: 83rem;
  font-family: 'League Spartan', Helvetica, sans-serif;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 80px
}
.nav-content {
  max-width: 1920px;
  display: grid;
  grid-template-columns: 1fr 7fr auto;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.nav-container,
.nav-content {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
#nav {
  list-style: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  gap: 1.5rem;
  float: right;
  margin-bottom: 0;
  padding-right: 1.5rem;
}
#nav a,
#nav a:hover {
  text-decoration: none;
  color: #222222;
}
#nav-download {
  height: auto;
  background-color: #ffd400;
  color: #222222;
  float: right;
  border-radius: 50rem;
  border-color: transparent;
  font-weight: 700;
  padding: 0.8rem 1.6rem;
}
.nav-download:hover {
  text-decoration: none;
  background-color: #ffd400;
  color: #222222;
}
a:hover {
  color: #222222;
}
.oskari-logo {
  display: flex;
  justify-content: flex-start;
  vertical-align: baseline;
}
</style>