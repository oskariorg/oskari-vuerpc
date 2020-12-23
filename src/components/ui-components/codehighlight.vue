<template>
    <span>
      <pre v-if="codeSnippet"><code class="hljs" v-html="codeSnippet" /></pre>
      <span v-if="!codeSnippet"><slot>
          Never shown - just used to capture optional body content for this tag
      </slot></span>
    </span>
</template>

<script>
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';
import '../../assets/monokai-sublime.css';
import { getRawTextFromVueSlot } from './codehighlight_helper';

// register support for code highlighting. JS and HTML(xml) is all we need.
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

const errorMsg = 'Code snippet missing/unable to parse';

const doHighLight = (codeSnippet, lang = 'javascript') => {
  const highlightedCode = hljs.highlight(lang, codeSnippet).value;
  return highlightedCode;
}

const getSlotContent = (slots) => {
  // parse body content
  if (!slots || !slots.default) {
    return errorMsg;
  }
  if (slots.default.length !== 1) {
    console.log('Only one slot is supported');
    return errorMsg;
  }
  if (!slots.default[0].text) {
    // text not defined -> tag has html content
    try {
      return getRawTextFromVueSlot(slots.default[0]);
    } catch(errIgnored) { }
    return errorMsg;
  }
  let content = slots.default[0].text.trim();
  // replace encoded html tags - Vue will escape it when displaying
  content = content.split('&lt;').join('<');
  content = content.split('&gt;').join('>');
  return content;
};

export default {
  props: {
    'snippet': String,
    'lang': String
  },
  computed: {
    codeSnippet: function () {
      if (this.snippet) {
        // content provided as an attribute
        return doHighLight(this.snippet, this.lang);
      }
      // parse body content
      const code = getSlotContent(this.$slots);
      return doHighLight(code, this.lang);
    }
  }
}
</script>
