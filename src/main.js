import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';

import router from './router';
import DocumentationLink from './components/ui-components/documentation_link.vue';
import RunExampleButton from './components/ui-components/run_example_button.vue';
import InlineCodeSnippet from './components/ui-components/inline_code_snippet.vue';
import CodeEditor from './components/ui-components/codeeditor.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css';

const app = createApp(App);
// so we keep line breaks in code snippets
app.config.compilerOptions.whitespace = 'preserve';

// Declare these as common components so pages don't need to declare these repeatedly
// as they are used in all pages
app.component('CodeSnippet', CodeEditor);
app.component('RunExampleButton', RunExampleButton);
app.component('DocumentationLink', DocumentationLink);
app.component('InlineCode', InlineCodeSnippet);
app.component('CodeEditor', CodeEditor);

// app.use(BootstrapVue);
app.use(router);

app.mount('#app');
