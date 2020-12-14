<template>
  <div>
    <div class="selectExamples">
    <h2>Select Action <NavigationDropdown :current="currentPageName" /></h2>
    <div class="navigationLinkParent">
      <span class="navigationLinkLeft"><router-link :to="navLinks.prev.path">Previous:  {{ navLinks.prev.name }}</router-link></span>
      <span class="navigationLinkLeft"><router-link :to="navLinks.next.path">Next: {{ navLinks.next.name }}</router-link></span>

      <br />Current: {{ currentPage.name }}<hr/>
    </div>
  </div>
</div>
</template>

<script>
import NavigationDropdown from './page_navigation_dropdown.vue';
import routes from '../../routes.js';
import routesHelper from '../../util/routesHelper';
import { mapGetters } from 'vuex';
import pages from '../../pages';

export default {
  components: {
    NavigationDropdown
  },
  props: {
    'currentPage': Object
  },
  data () {
    console.log('current', this.currentPage);
    const navLinks = routesHelper.getNextAndPrev(this.currentPage);
    let currentPage;
    if (this.currentPage) {
      currentPage = this.currentPage.name;
    }
    return {
      currentPageName: currentPage,
      navLinks
    }
  }
}
</script>
<style>
.selectExamples {
  box-shadow: 2px 2px 1px #888888;
}
.selectExamples h2 {
  background-color: #E9E9E9 !important;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .15s;
}

.fade-enter-active {
  transition-delay: .15s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
.navigationLink {
  word-break:normal;
  white-space:nowrap;
  font-size: calc(0.34rem + 1.0vh);
}
.navigationLinkParent {
  height:1.5em;
  max-width:33.75em;
}
.navigationLinkLeft {
  float:left;
  display:block;
  margin-inline-end: auto;
}
.navigationLinkRight {
  float: right;
  display:block;
}
</style>
