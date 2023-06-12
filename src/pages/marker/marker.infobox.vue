<template>
  <div>
    <p>
      It is possible to show relevant information to a marker with an info box.
      First, a marker has to be added to the map.
    </p>
    <RunExampleButton @click="addMarkerRequestCenterOfMapForInfobox">
      AddMarkerRequest
    </RunExampleButton>
    <CodeSnippet>
var MARKER_ID = 'MARKER_WITH_POPUP';
channel.getMapPosition(function(data) {
  // Add marker to center map
  var markerData = {
    x: data.centerX,
    y: data.centerY,
    color: 'ff0000',
    msg : '',
    shape: 1, // icon number (0-6)
    size: 3
  };
  channel.postRequest('MapModulePlugin.AddMarkerRequest', [markerData, MARKER_ID]);
  channel.log('MapModulePlugin.AddMarkerRequest posted with data', markerData);
});
    </CodeSnippet>
      <p>
        An info box is added to a marker with an <InlineCode>InfoBox.ShowInfoBoxRequest</InlineCode>.
        Remember to include a reference to the marker in the parameters. See the request documentation 
        for further details on usage.
      </p>
      <DocumentationLink type="request" :apiDoc="apiDocPage">Documentation for InfoBox.ShowInfoBoxRequest</DocumentationLink>
      <RunExampleButton @click="showInfoBoxRequestForMarker">InfoBox.ShowInfoBoxRequest</RunExampleButton>
    <CodeSnippet>
// Open popup for marker
var MARKER_ID = 'MARKER_WITH_POPUP';
var content = [
  {
    'html': '&lt;div&gt;Marker popup&lt;/div&gt;'
  }];
var infoboxData = [
  'markerInfoBox',
  'Marker info box',
  content,
  {
    marker: MARKER_ID // ref to marker
  },
  {
    mobileBreakpoints: {
      width: 0,
      height: 0
    },
    hidePrevious: true
  }
];

channel.postRequest('InfoBox.ShowInfoBoxRequest', infoboxData);
channel.log('InfoBox.ShowInfoBoxRequest posted with data', infoboxData);">
    </CodeSnippet>
  </div>
</template>
<script>
export default {
  name: 'ShowInfoBoxForMarker',
  label: 'Show info box for marker',
  data() {
    return {
      desc: 'Show info box for marker',
      apiDocPage: 'ui/infobox/request/infobox.showinfoboxrequest.md'
    };
  },
  methods: {
    addMarkerRequestCenterOfMapForInfobox() {
      const MARKER_ID = 'MARKER_WITH_POPUP';
      this.$root.channel.getMapPosition((data) => {
        // Add marker to center map
        const markerData = {
          x: data.centerX,
          y: data.centerY,
          color: 'ff0000',
          msg: '',
          shape: 1, // icon number (0-6)
          size: 4
        };
        this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [markerData, MARKER_ID]);
        this.$root.channel.log('MapModulePlugin.AddMarkerRequest posted with data', markerData);
      });
    },
    showInfoBoxRequestForMarker() {
      // Open popup for marker
      const MARKER_ID = 'MARKER_WITH_POPUP';
      const content = [
        {
          html: '<div>Marker popup</div>'
        }
      ];
      const infoboxData = [
        'markerInfoBox',
        'Marker info box',
        content,
        {
          marker: MARKER_ID
        },
        {
          mobileBreakpoints: {
            width: 100,
            height: 100
          },
          hidePrevious: true
        }
      ];

      this.$root.channel.postRequest('InfoBox.ShowInfoBoxRequest', infoboxData);
      this.$root.channel.log('InfoBox.ShowInfoBoxRequest posted with data', infoboxData);
    }
  },
  beforeUnmount() {
    this.$root.channel.postRequest('InfoBox.HideInfoBoxRequest');
    this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
  }
};
</script>
