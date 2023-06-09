<template>
  <span>
    <pre v-if="codeSnippet">
          <code class="hljs" v-html="codeSnippet"/>
        </pre>
    <span v-if="!codeSnippet">
      <slot> Never shown - just used to capture optional body content for this tag </slot>
    </span>
  </span>
</template>

<script>
import { useSlots } from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';
import '../../assets/monokai-sublime.css';

// register support for code highlighting. JS and HTML(xml) is all we need.
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

const errorMsg = 'Code snippet missing/unable to parse';

const doHighLight = (codeSnippet, lang = 'javascript') => {
  const highlightedCode = hljs.highlight(codeSnippet, { language: lang }).value;
  return highlightedCode;
};
export default {
  name: 'codeSnippet',
  props: {
    snippet: String,
    lang: String
  },
  computed: {
    codeSnippet() {
      const slots = useSlots();
      let snippet = this.snippet;
      if (!snippet) {
        try {
          const slotEl = slots.default()[0];
          snippet = slotEl.text.trim();
          //codeSnippet = codeSnippet.split('&lt;').join('<');
          //codeSnippet = codeSnippet.split('&gt;').join('>');
        } catch (err) {
          err;
        }
      }
      try {
        snippet = doHighLight(snippet, this.lang);
      } catch (err) {
        snippet = errorMsg;
        //debugger;
        /* ignored */
      }
      // expose to template and other options API hooks
      return snippet;
    }
  }
};
</script>
