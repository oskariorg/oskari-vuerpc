<template>
    <span>
      <pre v-highlightjs v-if="snippet"><code class="javascript">{{ snippet }}</code></pre>
      <span v-if="!snippet" ref="mySlot"><slot>
          Never shown - just used to capture optional body content for this tag
      </slot></span>
      </span>

</template>
<script>
import '../../assets/monokai-sublime.css';
export default {
  props: ['snippet'],
  mounted () {
    if (this.snippet) {
      // content provided as an attribute
      return;
    }
    // parse body content
    let content = this.$refs.mySlot.innerHTML.trim();
    // replace encoded html tags - Vue will escape it when displaying
    content = content.split('&lt;').join('<');
    content = content.split('&gt;').join('>');
    this.snippet = content;
  }
}
</script>
