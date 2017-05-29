<template>
  <pre v-highlightjs><code class="javascript">{{ snippet }}</code></pre>
</template>
<script>
import '../../assets/monokai-sublime.css';
export default {
  props: ['snippet'],
  data () {
    return {}
  }
}
</script>
