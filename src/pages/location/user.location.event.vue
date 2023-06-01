<template>
  <div>
    <div>Occurs after user's location is fetched</div>
    <DocumentationLink type="event" :apiDoc="apiDocPage"> To the documentation</DocumentationLink>
    <CodeSnippet>
{
  'lon': 386436.3607007161,
  'lat': 6672447.439965934
}
    </CodeSnippet>
  </div>
</template>
<script>
export default {
  name: 'UserLocationEvent',
  label: 'UserLocationEvent',
  data() {
    return {
      desc: 'UserLocationEvent',
      apiDocPage: 'mapping/mapmodule/event/userlocationevent.md'
    };
  }
};
</script>
