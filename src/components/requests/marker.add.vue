<template>
  <div id="markers">
    In these examples, first zoom to Helsinki to see markers working.

    <div id="AddMarkerRequest">
      <div>Adding markers with Oskari default icons (shape number between 0 and 6)</div>
      <button ref="btnMapModulePluginAddMarkerRequest" class="btn btn-primary" @click="addMarkerRequest1">MapModulePlugin.AddMarkerRequest</button>
      <div>
        <a id="addMarkers" href="" @click="getLink">To the documentation</a>
      </div>

          <code-component :snippet="markerDefault"></code-component>
      </div>

      <div id="AddMarkerRequest2">
        <div>Adding markers with own svg icon (happy face icon)</div>
        <button ref="btnMapModulePluginAddMarkerRequest" class="btn btn-primary" @click="addMarkerRequest2">MapModulePlugin.AddMarkerRequest</button>
        <div>
          <a id="addMarkers" href="" @click="getLink">To the documentation</a>
        </div>

          <code-component :snippet="markerSvg"></code-component>

    </div>

    <div id="AddMarkerRequest3">
      <div>Adding markers with own icon</div>
      <button ref="btnMapModulePluginAddMarkerRequest" class="btn btn-primary" @click="addMarkerRequest3">MapModulePlugin.AddMarkerRequest</button>
      <div>
        <a id="addMarkers" href="" @click="getLink">To the documentation</a>
      </div>

        <code-component :snippet="markerOwn"></code-component>

  </div>

  <div id="RemoveMarkersRequest">
    <div>Removing markers</div>
    <button id="btnMapModulePluginRemoveMarkersRequest" class="btn btn-primary" @click="removeMarkersRequest">MapModulePlugin.RemoveMarkersRequest</button>
    <div>
      <a id="removeMarkers" href="" @click="getLink">To the documentation</a>
    </div>

      <code-component snippet="channel.postRequest('MapModulePlugin.RemoveMarkersRequest', [MARKER_ID]);
      // Or all markers
      channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);"></code-component>
</div>
</div>
</template>
<script>
import { marker } from '../../util/examplecodes.js';
export default {
  name: 'AddMarkerRequest',
  data () {
    return {
      desc: 'Add or remove  a marker',
      MARKER_ID: 'RPC_MARKER',
      markerDefault: marker.addDefault,
      markerSvg: marker.addSvg,
      markerOwn: marker.addOwn
    }
  },
  methods: {
    addMarkerRequest1 () {
      const data = {
        x: 386020,
        y: 6670057,
        color: 'ff0000',
        msg: '',
        shape: 3,
        size: 3
      };
      this.$root.channel.postRequest('MapMoveRequest', [data.x, data.y, 7]);
      this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, this.MARKER_ID]);
      this.$root.channel.log('MapModulePlugin.AddMarkerRequest posted with data', [data, this.MARKER_ID]);
    },
    addMarkerRequest2 () {
      const data = {
        x: 386020,
        y: 6670057,
        msg: '',
        shape: '<svg width="32" height="32"><g fill="#9955ff" transform="matrix(0.06487924,0,0,0.06487924,0,1.73024e-6)"><g><path d="M 246.613,0 C 110.413,0 0,110.412 0,246.613 c 0,136.201 110.413,246.611 246.613,246.611 136.2,0 246.611,-110.412 246.611,-246.611 C 493.224,110.414 382.812,0 246.613,0 Z m 96.625,128.733 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m -196.743,0 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m 100.738,284.184 c -74.374,0 -138.225,-45.025 -165.805,-109.302 l 48.725,0 c 24.021,39.5 67.469,65.885 117.079,65.885 49.61,0 93.058,-26.384 117.079,-65.885 l 48.725,0 C 385.46,367.892 321.608,412.917 247.233,412.917 Z" /></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></g><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /></svg>',
        offsetX: 16,
        offsetY: 16,
        size: 3
      };
      this.$root.channel.postRequest('MapMoveRequest', [data.x, data.y, 7]);
      this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, this.MARKER_ID]);
      this.$root.channel.log('MapModulePlugin.AddMarkerRequest posted with data', [data, this.MARKER_ID]);
    },
    addMarkerRequest3 () {
      const data = {
        x: 386020,
        y: 6670057,
        shape: 'http://demo.paikkatietoikkuna.fi/Oskari/resources/framework/bundle/mapmodule-plugin/images/marker.png',
        offsetX: 16,
        offsetY: 0
      };
      this.$root.channel.postRequest('MapMoveRequest', [data.x, data.y, 7]);
      this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, this.MARKER_ID]);
      this.$root.channel.log('MapModulePlugin.AddMarkerRequest posted with data', [data, this.MARKER_ID]);
    },
    removeMarkersRequest () {
      this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
      this.$root.channel.log('RemoveMarkerRequest posted with data', []);
    },
    getLink (e) {
      var documentPathEnd = e.target.id === 'addMarkers' ? 'mapping/mapmodule/request/addmarkerrequest.md' : 'mapping/mapmodule/request/removemarkersrequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
}
</script>
