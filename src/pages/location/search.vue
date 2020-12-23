<template>
  <div>
    <h2>{{ title }}</h2>
    <p>The search for the Oskari intance can be used programmatically with {{ requestName }}.
      (even if the search UI is not shown on the map). This usually allows searching for place names
      and based on the Oskari instance configuration could also return any type of points of interest.
    </p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">Documentation for {{requestName}}</DocumentationLink>

    <div>
        <input v-model="query" placeholder="Search query">
        <button id="btnSearchRequest" class="btn btn-primary exampleready" @click="searchRequest">SearchRequest</button>
    </div>

    <CodeSnippet :snippet="codeSnippet" />
  </div>
</template>

<script>
const title = 'Perform a search';

const requestName = 'SearchRequest';
const apiDocPageRequest = 'framework/search/request/SearchRequest.md';

export default {
  name: 'SearchRequest',
  label: title,
  data () {
    return {
      title,
      requestName,
      apiDocPageRequest,
      query: 'Vantaa'
    }
  },
  computed: {
    codeSnippet () {
      // Changing slot content won't update the code highlight at runtime
      // If we pass the whole snippet as prop it will be updated as expected
      return `channel.postRequest('${requestName}', ['${this.query}']);`;
    }
  },
  methods: {
    searchRequest () {
      this.$root.channel.postRequest(requestName, [this.query]);
      this.$root.channel.log(SearchRequest + ' posted with data', data);
    }
  }
}
</script>
