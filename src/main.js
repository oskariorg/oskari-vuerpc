import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BootstrapVue from 'bootstrap-vue';

import App from './App.vue'

import router from './router'
import code from './components/ui-components/codehighlight.vue';
import DocumentationLink from './components/ui-components/documentation_link.vue';
import RunExampleButton from './components/ui-components/run_example_button.vue';
import InlineCodeSnippet from './components/ui-components/inline_code_snippet.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style.css';

const app = createApp(App);
// so we keep line breaks in code snippets
console.log(app.config)
app.config.compilerOptions.whitespace = 'preserve';

// Declare these as common components so pages don't need to declare these repeatedly
// as they are used in all pages
// TODO: remove code-component when its not used anymore
app.component('code-component', code);
// TODO: use CodeSnippet instead of code-component on pages
app.component('CodeSnippet', code);
app.component('RunExampleButton', RunExampleButton);
app.component('DocumentationLink', DocumentationLink);
app.component('InlineCode', InlineCodeSnippet);

app.use(BootstrapVue);
app.use(createPinia())
app.use(router)

app.mount('#app')

