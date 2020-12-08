import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import BootstrapVue from 'bootstrap-vue';
// import hljs from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';

import code from './components/ui-components/codehighlight.vue';
import VueRouter from 'vue-router';
import screenshot from './components/functions/map.screenshot.vue';

// register support for code highlighting. JS and HTML is all we need.
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

Vue.component('code-component', code);
Vue.use(VueRouter, BootstrapVue);

const routes = [
  { path: '/', component: App },
  { path: '/examples/screenshot', component: screenshot }
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.directive('highlightjs', {
  deep: true,
  bind: function (el, binding) {
    // on first bind, highlight all targets
    const targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value
      }
      hljs.highlightBlock(target)
    })
  }
  /*,
  componentUpdated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value
        hljs.highlightBlock(target)
      }
    })
  }*/
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
