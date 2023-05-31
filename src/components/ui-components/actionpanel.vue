<template>
  <div class="col-xs-12 col-md-12 col-sm-12 col-lg-6 col-xl-4 full-height-panel">
    <div class="panel panel-default form-panel">
      <div class="panel-body">
        <div id="select-panel">
          <PageNavigation :currentPage="currentPage" />
          <br />
          <transition name="fade">
            <!-- 
              Router-view shows the pages based on route (== url).
              See pages/index.js for adding/modifying order etc
              -->
            <router-view />
          </transition>
          <PageNavigation :currentPage="currentPage" v-bind:hideSelect="true" class="bottomnavi" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageNavigation from './page_navigation.vue';

export default {
  components: {
    PageNavigation
  },
  props: {
    currentPage: Object
  },
  data() {
    return {};
  }
};
</script>

<style>
#select-panel a {
  color: #8aa5d1;
}
.form-panel {
  border: 0.5px solid #d9d9d9;
}
#select-panel {
  margin: 0 auto;
}
h3 {
  font-family: 'Open Sans';
  font-size: 1.25rem !important;
}

.bottomnavi {
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
