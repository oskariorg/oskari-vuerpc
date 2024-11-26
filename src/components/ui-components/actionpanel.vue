<template>
  <div class="col-xs-12 col-md-12 col-sm-12 col-lg-6 col-xl-4 full-height-panel">
    <div class="panel panel-default form-panel">
      <div class="panel-body">
        <div id="select-panel">
          <PageNavigation :currentPage="currentPage" />
          <br />
          <!-- 
            Router-view shows the pages based on route (== url).
            See pages/index.js for adding/modifying order etc
          -->
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view>
          <PageNavigation :currentPage="currentPage" v-bind:hideSelect="true" class="bottomnavi" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageNavigation from './page_navigation.vue';

export default {
  name: 'actionPanel',
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
.form-panel {
  border: 0.5px solid #d9d9d9;
}
#select-panel {
  margin: 0 auto;
}
h3 {
  font-family: 'League Spartan', sans-serif;
  font-size: 1.25rem !important;
}

.bottomnavi {
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
