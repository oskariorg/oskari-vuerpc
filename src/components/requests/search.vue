<template>
  <div ref="SearchRequest">
    <div class="search-group">
      <div class="col-search">
        <input ref="search" name="search" id="inputSearch" placeholder="Search item">
        <button id="btnSearchRequest" class="btn btn-primary exampleready" @click="searchRequest">SearchRequest</button>
      </div>
    </div>
    <div>
      <a id="search" href="">To the documentation</a>
    </div>

    <code-component snippet="var data = 'Vantaa';
    channel.postRequest('SearchRequest', [data]);"></code-component>
  </div>
</template>
<script>
export default {
  name: 'SearchRequest',
  data () {
    return {
      desc: 'Perform a search'
    }
  },
  methods: {
    searchRequest () {
      var data = this.$refs.search.value;

      this.$root.channel.postRequest('SearchRequest', [data]);
      this.$root.channel.log('SearchRequest posted with data', data);
    }
  }
}
</script>
