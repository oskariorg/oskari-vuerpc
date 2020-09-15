<template>
  <div id="action">
    <select v-model="selected" @change="getSelectedInfo" ref="actionSelector">
      <option value="gettingStarted">Getting Started</option>
      <optgroup label="Map">
        <option v-for="option in map" :value="option.value">{{option.text}}</option>
      </optgroup>
      <optgroup label="Markers">
        <option v-for="option in markers" :value="option.value">{{option.text}}</option>
      </optgroup>
      <optgroup label="Features">
        <option v-for="option in features" :value="option.value">{{option.text}}</option>
      </optgroup>
      <optgroup label="Drawing">
        <option v-for="option in drawing" :value="option.value">{{option.text}}</option>
      </optgroup>
      <optgroup label="Supported">
        <option v-for="option in supported" :value="option.value">{{option.text}}</option>
      </optgroup>
      <optgroup label="Feedback">
        <option v-for="option in feedback" :value="option.value">{{option.text}}</option>
      </optgroup>
      <optgroup label="Ui">
        <option v-for="option in ui" :value="option.value">{{option.text}}</option>
      </optgroup>
      <optgroup label="Location">
        <option v-for="option in locationbased" :value="option.value">{{option.text}}</option>
      </optgroup>
    </select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['update'],
  watch: {
    update: function () {
      this.selected = this.update;
    }
  },
  data () {
    return {
      map: [
        { value: 'AfterMapMoveEvent', text: 'AfterMapMoveEvent' },
        { value: 'ChangeMapLayerOpacityRequest', text: 'Change map layer opacity' },
        /*'{ value: 'MapLayerUpdateRequest', text: 'Change map layer style' },*/
        { value: 'LayerVisibility', text: 'Change map layer visibility' },
        { value: 'GetScreenshot', text: 'Get a screenshot of the map' },
        { value: 'GetAllLayers', text: 'Get available map layers' },
        { value: 'GetMapBbox', text: 'Get map bbox' },
        { value: 'GetMapPosition', text: 'Get map position' },
        { value: 'GetPixelMeasuresInScale', text: 'Get pixel measures in scale' },
        { value: 'stateHandling', text: 'Handle map state' },
        { value: 'MapClickedEvent', text: 'MapClickedEvent' },
        { value: 'MapMoveRequest', text: 'Move map' },
        { value: 'MapTourRequest', text: 'Move map along route' },
        { value: 'rotateMap', text: 'Rotate map' },
        { value: 'mapZoomFunctions', text: 'Zoom functions' }
      ],
      markers: [
        { value: 'AddMarkerRequest', text: 'Add or remove  a marker' },
        { value: 'AfterAddMarkerEvent', text: 'AfterAddMarkerEvent' },
        { value: 'MarkerClickEvent', text: 'MarkerClickEvent' },
        { value: 'ShowInfoBoxForMarker', text: 'Show info box for marker' },
        { value: 'showOrHideMarkers', text: 'Show or hide a marker' }
      ],
      features: [
        { value: 'addOrRemoveFeatures', text: 'Add, update or remove vector features' },
        { value: 'FeatureEvent', text: 'FeatureEvent' },
        { value: 'GetFeatures', text: 'Get features' },
        { value: 'GetFeatureInfoRequest', text: 'Get feature info' },
        { value: 'ZoomToFeatures', text: 'Zoom to features' }
      ],
      drawing: [
        { value: 'DrawingEvent', text: 'Drawing Event' },
        { value: 'drawing', text: 'Drawing requests' }
      ],
      supported: [
        { value: 'GetSupportedEvents', text: 'Get supported events' },
        { value: 'GetSupportedFunctions', text: 'Get supported functions' },
        { value: 'GetSupportedRequests', text: 'Get supported requests' }
      ],
      feedback: [
        { value: 'GetFeedbackServices', text: 'Get feedback services (poc)' },
        { value: 'GetFeedbackRequest', text: 'Get posted feedback data (poc)' },
        { value: 'PostFeedbackRequest', text: 'Post users feedback data (poc)' },
        { value: 'FeedbackResultEvent', text: 'FeedbackResultEvent' }
      ],
      ui: [
        { value: 'SendUIEvent', text: 'Send UI event' },
        { value: 'setCursorStyle', text: 'Set cursor style' },
        { value: 'ShowProgressSpinnerRequest', text: 'Show a progress spinner' },
        { value: 'ShowInfoBox', text: 'Show or hide info box' }
      ],
      locationbased: [
        { value: 'GetRouteRequest', text: 'Get route' },
        { value: 'GetUserLocationRequest', text: 'Get users location' },
        { value: 'SearchRequest', text: 'Perform a search' },
        { value: 'SearchResultEvent', text: 'SearchResultEvent' },
        { value: 'RouteResultEvent', text: 'RouteResultEvent' },
        { value: 'UserLocationEvent', text: 'UserLocationEvent' }
      ],
      selected: 'gettingStarted'
    }
  },
  methods: {
    getSelectedInfo (event) {
      this.$store.state.rpcExample = event.target.value;
      this.$store.state.examplesViewed.push(event.target.value);
    }
  },
  mounted () {
    this.$store.state.rpcExample = this.selected;
  }
}
</script>

<style>
#action {
  display: inline-block;
}
#actionSelector {
  max-width:100%;
  font-size: 20px;
}
select {
    font-size: calc(0.8rem + 1.0vh) !important;
}
option {
  font-size:18px !important;
}
optgroup {
  font-size:20px !important;
}
</style>
