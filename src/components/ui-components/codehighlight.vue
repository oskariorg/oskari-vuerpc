<template>
    <span>
      <pre v-highlightjs v-if="codeSnippet"><code :class="language">{{ codeSnippet }}</code></pre>
      <span v-if="!codeSnippet"><slot>
          Never shown - just used to capture optional body content for this tag
      </slot></span>
      </span>

</template>
<script>
import { getRawTextFromVueSlot } from '../../util/vue_slot_content_helper';
import '../../assets/monokai-sublime.css';

const errorMsg = 'Code snippet missing/unable to parse';

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
    language: function () {
      return this.lang || 'javascript';
    },
    codeSnippet: function () {
      if (this.snippet) {
        // content provided as an attribute
        return this.snippet;
      }
      // parse body content
      return getSlotContent(this.$slots);
    }
  }
}
</script>
