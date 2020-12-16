<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Occurs after the map has been clicked. Click the map to see the event in the log.
    </p>
    <DocumentationLink type="event" :apiDoc="apiDocPage">Documentation for {{title}}</DocumentationLink>
    <CodeSnippet>
{
  'lon': 423424,
  'lat': 6821888,
  'x': 312,
  'y': 236,
  'ctrlKeyDown': false
}
    </CodeSnippet>
  </div>
</template>

<script>
const apiDocPage = 'mapping/mapmodule/event/MapClickedEvent.md';
const title = 'MapClickedEvent';

export default {
  name: 'MapClickedEvent',
  label: title,
  data () {
    return {
      title,
      apiDocPage
    }
  }
}
</script>
