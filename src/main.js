import Vue from 'vue';
import App from './App.vue';
import routesHelper from './util/routesHelper';
import { store } from './store';
import BootstrapVue from 'bootstrap-vue';
import code from './components/ui-components/codehighlight.vue';
import DocumentationLink from './components/ui-components/documentation_link.vue';
import RunExampleButton from './components/ui-components/run_example_button.vue';
import VueRouter from 'vue-router';


// Declare these as common components so pages don't need to declare these repeatedly
// as they are used in all pages
// TODO: remove code-component when its not used anymore
Vue.component('code-component', code);
// TODO: use CodeSnippet instead of code-component on pages
Vue.component('CodeSnippet', code);
Vue.component('RunExampleButton', RunExampleButton);
Vue.component('DocumentationLink', DocumentationLink);

Vue.use(VueRouter, BootstrapVue);

const router = new VueRouter({
  routes: routesHelper.getRoutes(),
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
