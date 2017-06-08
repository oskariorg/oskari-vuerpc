<template>
  <div id="ShowInfoBoxForMarkers">
    <div>
      <a id="AddMarkerRequest2" href="">To the documentation</a>
      <a id="InfoBox.ShowInfoBoxRequest2" href="">To the documentation</a>
    </div>

    <div>
      1. Move map
    </div>
    2. Add marker to center of map
    <button id="btnAddMarkerCenterOfMapForInfobox" class="btn btn-primary exampleready" @click="addMarkerRequestCenterOfMapForInfobox">AddMarkerRequest</button>
          <code-component snippet="var MARKER_ID = 'MARKER_WITH_POPUP';
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
          });"></code-component>
      <div>
        3. Open popup for added marker
        <button id="btnShowInfoBoxRequestForMarker" class="btn btn-primary exampleready" @click="showInfoBoxRequestForMarker">InfoBox.ShowInfoBoxRequest</button>
        </div>
            <code-component snippet="// Open popup for marker
            var MARKER_ID = 'MARKER_WITH_POPUP';
            var content = [
              {
                'html': '<div>Marker popup</div>'
              }
            ];
            var infoboxData = [
              'markerInfoBox',
              'Marker info box',
              content,
              {
                marker: MARKER_ID
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
            channel.log('InfoBox.ShowInfoBoxRequest posted with data', infoboxData);"></code-component>
        </div>
</template>
<script>
export default {
  name: 'ShowInfoBoxForMarker',
  data () {
    return {
      desc: 'Show info box for marker'
    }
  },
  methods: {
    addMarkerRequestCenterOfMapForInfobox () {
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
    showInfoBoxRequestForMarker () {
      // Open popup for marker
      const MARKER_ID = 'MARKER_WITH_POPUP';
      const content = [
        {
          'html': '<div>Marker popup</div>'
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
  }
}
</script>
