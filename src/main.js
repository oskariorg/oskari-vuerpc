import Vue from 'vue';
import App from './App.vue';
import Header from './components/ui-components/Header.vue';
import { store } from './store';
import BootstrapVue from 'bootstrap-vue';
import hljs from 'highlight.js';
import code from './components/ui-components/codehighlight.vue';

Vue.component('app-header', Header);
Vue.component('code-component', code);
Vue.use(BootstrapVue);

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
  },
  componentUpdated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value
        hljs.highlightBlock(target)
      }
    })
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
