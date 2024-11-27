<template>
  <div>
    <h2>{{ title }}</h2>
    <div>Occurs after user's location is fetched</div>
    <DocumentationLink type="event" apiDoc="UserLocationEvent"> To the documentation</DocumentationLink>
    <CodeSnippet>
{
  'lon': 386436.3607007161,
  'lat': 6672447.439965934
}
    </CodeSnippet>
  </div>
</template>
<script>
const title = 'UserLocationEvent';
export default {
  name: 'UserLocationEvent',
  label: title,
  data() {
    return {
      title
    };
  }
};
</script>
