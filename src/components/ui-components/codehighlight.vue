<template>
    <span>
      <pre v-if="codeSnippet"><code class="hljs" v-html="codeSnippet" /></pre>
      <span v-if="!codeSnippet"><slot>
          Never shown - just used to capture optional body content for this tag
      </slot></span>
    </span>
</template>

<script>
import { useSlots } from 'vue'
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
}
export default {
  props: {
    'snippet': String,
    'lang': String
  },
  setup(props) {
    const slots = useSlots();
    let codeSnippet = errorMsg;
    try {
      const slotEl = slots.default()[0];
      codeSnippet = slotEl.text.trim();
      //codeSnippet = codeSnippet.split('&lt;').join('<');
      //codeSnippet = codeSnippet.split('&gt;').join('>');
      codeSnippet = doHighLight(codeSnippet, props.lang);
    } catch (err) {
      debugger;
      /* ignored */
      }
    // expose to template and other options API hooks
    return {
      codeSnippet
    }
  }
}
</script>
