<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Occurs after the map has been moved</p>
    <DocumentationLink :apiDoc="apiDocPage">Documentation for {{title}}</DocumentationLink>
    <CodeSnippet>
{
  'centerX': 411650.70779123,
  'centerY': 6751897.3481153,
  'zoom': 4,
  'scale': 362834
}
    </CodeSnippet>
  </div>
</template>
<script>
const apiDocPage = 'mapping/mapmodule/event/AfterMapMoveEvent.md';
const title = 'AfterMapMoveEvent';

export default {
  name: 'AfterMapMoveEvent',
  label: title,
  data () {
    return {
      title,
      apiDocPage
    }
  }
}
</script>
