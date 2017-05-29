<template>
  <div id="action">
    <select @change="getSelectedInfo" id="actionSelector">
      <option :selected="selected">{{ selected }}</option>
      <optgroup label="Map">
        <option v-for="item in map" :value="item.item">{{item.desc}}</option>
      </optgroup>
      <optgroup label="Markers">
        <option v-for="marker in markers" :value="marker.marker">{{marker.desc}}</option>
      </optgroup>
      <optgroup label="Features">
        <option v-for="feature in features" :value="feature.feature">{{feature.desc}}</option>
      </optgroup>
      <optgroup label="Drawing">
        <option v-for="draw in drawing" :value="draw.draw">{{draw.desc}}</option>
      </optgroup>
      <optgroup label="Supported">
        <option v-for="action in supported" :value="action.action">{{action.desc}}</option>
      </optgroup>
      <optgroup label="Feedback">
        <option v-for="feedback in feedback" :value="feedback.feedback">{{feedback.desc}}</option>
      </optgroup>
      <optgroup label="Ui">
        <option v-for="ui in ui" :value="ui.ui">{{ui.desc}}</option>
      </optgroup>
      <optgroup label="Location">
        <option v-for="item in locationbased" :value="item.item">{{item.desc}}</option>
      </optgroup>
    </select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    // mapgetters is a helper to return your getter functions from the store
    ...mapGetters({
      selected: 'selectedExample'
    })
  },
  data () {
    return {
      map: [
        { item: 'GetAllLayers', desc: 'Get available map layers' },
        { item: 'GetMapPosition', desc: 'Get map position' },
        { item: 'GetMapBbox', desc: 'Get map bbox' },
        { item: 'mapZoomFunctions', desc: 'Zoom functions' },
        { item: 'stateHandling', desc: 'Handle map state' },
        { item: 'GetFeatures', desc: 'Get features' },
        { item: 'GetScreenshot', desc: 'Get a screenshot of the map' },
        { item: 'MapLayerUpdateRequest', desc: 'Change map layer style' },
        { item: 'MapMoveRequest', desc: 'Move map' },
        { item: 'rotateMap', desc: 'Rotate map' },
        { item: 'ChangeMapLayerOpacityRequest', desc: 'Change map layer opacity' },
        { item: 'LayerVisibility', desc: 'Change map layer visibility' },
        { item: 'ShowInfoBox', desc: 'Show or hide info box' },
        { item: 'GetPixelMeasuresInScale', desc: 'Get pixel measures in scale' },
        { item: 'MapClickedEvent', desc: 'MapClickedEvent' },
        { item: 'AfterMapMoveEvent', desc: 'AfterMapMoveEvent' }
      ],
      markers: [
        { marker: 'AddMarkerRequest', desc: 'Add or remove  a marker' },
        { marker: 'ShowInfoBoxForMarker', desc: 'Show info box for marker' },
        { marker: 'showOrHideMarkers', desc: 'Show or hide a marker' },
        { marker: 'AfterAddMarkerEvent', desc: 'AfterAddMarkerEvent' },
        { marker: 'MarkerClickEvent', desc: 'MarkerClickEvent' }
      ],
      features: [
        { feature: 'GetFeatureInfoRequest', desc: 'Get feature info' },
        { feature: 'addOrRemoveFeatures', desc: 'Add or remove vector features' },
        { feature: 'updateFeatures', desc: 'Update vector features' },
        { feature: 'ZoomToFeatures', desc: 'Zoom to features' },
        { feature: 'FeatureEvent', desc: 'FeatureEvent' }
      ],
      drawing: [
        { draw: 'DrawingEvent', desc: 'DrawingEvent' },
        { draw: 'drawing', desc: 'Drawing requests' }
      ],
      supported: [
        { action: 'GetSupportedEvents', desc: 'Get supported events' },
        { action: 'GetSupportedFunctions', desc: 'Get supported functions' },
        { action: 'GetSupportedRequests', desc: 'Get supported requests' }
      ],
      feedback: [
        { feedback: 'GetFeedbackServices', desc: 'Get feedback services (poc)' },
        { feedback: 'GetFeedbackRequest', desc: 'Get posted feedback data (poc)' },
        { feedback: 'PostFeedbackRequest', desc: 'Post users feedback data (poc)' },
        { feedback: 'FeedbackResultEvent', desc: 'FeedbackResultEvent' }
      ],
      ui: [
        { ui: 'ShowProgressSpinnerRequest', desc: 'Show a progress spinner' },
        { ui: 'ShowInfoBox', desc: 'Show or hide info box' },
        { ui: 'SendUIEvent', desc: 'Send UI event' },
        { ui: 'setCursorStyle', desc: 'Set cursor style' }
      ],
      locationbased: [
        { item: 'GetRouteRequest', desc: 'Get route' },
        { item: 'GetUserLocationRequest', desc: 'Get users location' },
        { item: 'SearchRequest', desc: 'Perform a search' },
        { item: 'UserLocationEvent', desc: 'UserLocationEvent' },
        { item: 'SearchResultEvent', desc: 'SearchResultEvent' },
        { item: 'RouteResultEvent', desc: 'RouteResultEvent' }
      ],
      select: 'Getting Started'
    }
  },
  methods: {
    getSelectedInfo (event) {
      this.$store.state.rpcExample = event.target.value;
      // this.$store.state.rpcExample.desc = event.target.selectedOptions[0].innerText;
      this.$store.state.examplesViewed.push(event.target.value);
    }
  },
  updated () {
    this.select = this.selected
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
option {
  font-size:18px !important;
}
optgroup {
  font-size:20px !important;
}
</style>
