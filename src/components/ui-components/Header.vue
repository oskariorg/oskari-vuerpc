<template>
  <div class="nav">
    <div class="nav-wrapper">
      <div class="nav-container">
        <div class="oskari-logo">
          <a href="http://www.oskari.org"
            ><img src="../../assets/img/oskari_logo_black_horizontal.svg" />
          </a>
        </div>
        <nav>
          <ul class="nav-menu" role="navigation">
            <li><a href="">Home</a></li>
            <li><a href="/discover/">Discover Oskari</a></li>
            <li><a href="/documentation/docs/latest/">Documentation</a></li>
            <li><a href="/community/">Community</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/contribute/">Contribute</a></li>
          </ul>
        </nav>
        <button class="nav-download" href="/download">Download</button>
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
.nav-wrapper {
  --text-color: #222222;
  --button-color: #ffd400;
  --f-size: 16px;
  --f-weight: bold;
  --l-spacing: 1px;
  --el-height: 3rem;

  font-family: 'League Spartan', sans-serif;
  height: 80px;
}

.nav-container {
  display: grid;
  grid-template-columns: 1fr 7fr auto;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.nav-wrapper,
.nav-container {
  max-width: 90rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.nav-menu {
  list-style: none;
  display: flex;
  font-size: var(--f-size);
  font-weight: var(--f-weight);
  letter-spacing: var(--l-spacing);
  gap: 1.5rem;
  float: right;
  margin-bottom: 0;
  padding-right: 1.5rem;
}

.nav-menu a,
.nav-menu a:hover {
  text-decoration: none;
  color: var(--main-bg-color);
}

.nav-download {
  height: var(--el-height);
  background-color: var(--button-color);
  color: var(--main-bg-color);
  font-size: var(--f-size);
  font-weight: var(--f-weight);
  letter-spacing: var(--l-spacing);
  border-radius: 50rem;
  border-color: transparent;
  padding: 0.8rem 1.6rem;
}

.nav-download:hover {
  text-decoration: none;
  background-color: var(--button-color);
  color: var(--main-bg-color);
}

.nav a:hover {
  color: var(--main-bg-color);
}

.oskari-logo img {
  height: var(--el-height);
}
</style>
