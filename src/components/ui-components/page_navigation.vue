<template>
  <div>
    <div class="selectExamples">
      <h2 v-if="!hideSelect">Select Action <NavigationDropdown :current="currentPage.name" /></h2>
      <div class="navigationLinkParent">
        <div class="prev" v-if="navLinks.prev">
          <router-link class="navigationLink" :to="navLinks.prev.path">
            <i class="arrow left"></i>
            Previous: {{ navLinks.prev.label }}
          </router-link>
        </div>
        <div class="next" v-if="navLinks.next">
          <router-link class="navigationLink" :to="navLinks.next.path">
            Next: {{ navLinks.next.label }}
            <i class="arrow right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationDropdown from './page_navigation_dropdown.vue';
import routesHelper from '../../router/routesHelper';

export default {
  components: {
    NavigationDropdown
  },
  props: {
    currentPage: Object,
    hideSelect: Boolean
  },
  computed: {
    navLinks() {
      return routesHelper.getNextAndPrev(this.currentPage);
    }
  }
};
</script>
<style>
.selectExamples {
  box-shadow: 2px 2px 1px #888888;
}
.selectExamples h2 {
  background-color: #e9e9e9 !important;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.15s;
}

.fade-enter-active {
  transition-delay: 0.15s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.navigationLinkParent {
  padding: 0.7em;
  overflow: hidden;
}

.navigationLink {
  padding: 0.5em;
  border: solid 1px black;
  border-radius: 5px;
  background-color: aqua;
}

.navigationLink:hover {
  text-decoration: none;
  background-color: blue;
}

.prev {
  float: left;
}

.next {
  float: right;
}

.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.left {
  transform: rotate(135deg);
}

.right {
  transform: rotate(-45deg);
}
</style>
