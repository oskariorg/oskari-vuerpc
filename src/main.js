import Vue from 'vue';
import App from './App.vue';
import routesHelper from './util/routesHelper';
import { store } from './store';
import BootstrapVue from 'bootstrap-vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';

import code from './components/ui-components/codehighlight.vue';
import DocumentationLink from './components/ui-components/documentation_link.vue';
import RunExampleButton from './components/ui-components/run_example_button.vue';
import VueRouter from 'vue-router';

// register support for code highlighting. JS and HTML(xml) is all we need.
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

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

// TODO: can this be moved to codehighlight.vue?
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
