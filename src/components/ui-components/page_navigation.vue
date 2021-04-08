<template>
  <div>
    <div class="selectExamples">
    <h2 v-if="!hideSelect">Select Action <NavigationDropdown :current="currentPage.name" /></h2>
    <div class="navigationLinkParent">
      <div v-if="navLinks.prev"><router-link :to="navLinks.prev.path">Previous:  {{ navLinks.prev.label }}</router-link></div>
      <div v-if="navLinks.next"><router-link :to="navLinks.next.path">Next: {{ navLinks.next.label }}</router-link></div>
    </div>
  </div>
</div>
</template>

<script>
import NavigationDropdown from './page_navigation_dropdown.vue';
import routesHelper from '../../util/routesHelper';

export default {
  components: {
    NavigationDropdown
  },
  props: {
    'currentPage': Object,
    'hideSelect': Boolean
  },
  computed: {
    navLinks () {
      return routesHelper.getNextAndPrev(this.currentPage);
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

.navigationLinkParent {
  padding-left: 0.7em;
  padding-right: 0.7em;
}
</style>
