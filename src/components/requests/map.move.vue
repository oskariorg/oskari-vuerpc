<template>
  <div>
    <h2>{{ title }}</h2>
    <p>This request can be used to move the map programmatically.</p>
    <DocumentationLink type="request" :apiDoc="apiDocPage">Documentation for {{title}}</DocumentationLink>
    <CodeSnippet>
var x = {{ LOCATION_POSIO[0] }};
var y =  {{ LOCATION_POSIO[1] }};;
var zoomLevel = {{ zoomLevel }};
channel.postRequest('MapMoveRequest', [x, y, zoomLevel]);
    </CodeSnippet>

    <p>
      Click the button to run the code above
       (you should also see a move event in the log after the map has moved):
    <RunExampleButton @click="moveMap">Move map to Posio</RunExampleButton>
    </p>
  </div>
</template>

<script>
const apiDocPage = 'mapping/mapmodule/request/MapMoveRequest.md';
const title = 'MapMoveRequest';

export default {
  name: 'MapMoveRequest',
  label: 'Move map',
  data () {
    return {
      title,
      apiDocPage,
      LOCATION_POSIO: [552935, 7332639],
      zoomLevel: 7
    }
  },
  methods: {
    moveMap () {
      this.$root.channel.postRequest('MapMoveRequest',
        [this.LOCATION_POSIO[0], this.LOCATION_POSIO[1], this.zoomLevel]);
      this.$root.channel.log('MapModulePlugin.MapMoveRequest posted with data', [this.LOCATION_POSIO[0], this.LOCATION_POSIO[1], 7]);
    }
  }
}
</script>
