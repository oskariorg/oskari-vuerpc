<template>
  <div ref="SearchResultEvent">
    <div>Occurs after a search request</div>
    <div>
      <a id="searchResult" href="" @click="getLink">To the documentation</a>
    </div>
    <code-component :snippet="result"></code-component>
    </div>
</template>
<script>
import { search } from '../../util/examplecodes.js';
export default {
  name: 'SearchResultEvent',
  data () {
    return {
      desc: 'SearchResultEvent',
      result: search.result
    }
  },
  methods: {
    getLink (e) {
      var documentPathEnd = 'framework/search/event/SearchResultEvent.md';
      e.target.href = this.$root.documentPathEvent + documentPathEnd;
    }
  }
}
</script>
