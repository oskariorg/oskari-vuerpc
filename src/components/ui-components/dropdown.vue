<template>
  <div id="action">
    <select v-model="selected" @change="getSelectedInfo" id="actionSelector">
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
  // props: ['selected'],
  // computed: {
  //   // mapgetters is a helper to return your getter functions from the store
  //   ...mapGetters({
  //     selected: 'selectedExample'
  //   })
  // },
  data () {
    return {
      map: [
        { value: 'GetAllLayers', text: 'Get available map layers' },
        { value: 'GetMapPosition', text: 'Get map position' },
        { value: 'GetMapBbox', text: 'Get map bbox' },
        { value: 'mapZoomFunctions', text: 'Zoom functions' },
        { value: 'stateHandling', text: 'Handle map state' },
        { value: 'GetScreenshot', text: 'Get a screenshot of the map' },
        { value: 'MapLayerUpdateRequest', text: 'Change map layer style' },
        { value: 'MapMoveRequest', text: 'Move map' },
        { value: 'rotateMap', text: 'Rotate map' },
        { value: 'ChangeMapLayerOpacityRequest', text: 'Change map layer opacity' },
        { value: 'LayerVisibility', text: 'Change map layer visibility' },
        { value: 'ShowInfoBox', text: 'Show or hide info box' },
        { value: 'GetPixelMeasuresInScale', text: 'Get pixel measures in scale' },
        { value: 'MapClickedEvent', text: 'MapClickedEvent' },
        { value: 'AfterMapMoveEvent', text: 'AfterMapMoveEvent' }
      ],
      markers: [
        { value: 'AddMarkerRequest', text: 'Add or remove  a marker' },
        { value: 'ShowInfoBoxForMarker', text: 'Show info box for marker' },
        { value: 'showOrHideMarkers', text: 'Show or hide a marker' },
        { value: 'AfterAddMarkerEvent', text: 'AfterAddMarkerEvent' },
        { value: 'MarkerClickEvent', text: 'MarkerClickEvent' }
      ],
      features: [
        { value: 'GetFeatures', text: 'Get features' },
        { value: 'GetFeatureInfoRequest', text: 'Get feature info' },
        { value: 'addOrRemoveFeatures', text: 'Add or remove vector features' },
        { value: 'updateFeatures', text: 'Update vector features' },
        { value: 'ZoomToFeatures', text: 'Zoom to features' },
        { value: 'FeatureEvent', text: 'FeatureEvent' }
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
        { value: 'ShowProgressSpinnerRequest', text: 'Show a progress spinner' },
        { value: 'ShowInfoBox', text: 'Show or hide info box' },
        { value: 'SendUIEvent', text: 'Send UI event' },
        { value: 'setCursorStyle', text: 'Set cursor style' }
      ],
      locationbased: [
        { value: 'GetRouteRequest', text: 'Get route' },
        { value: 'GetUserLocationRequest', text: 'Get users location' },
        { value: 'SearchRequest', text: 'Perform a search' },
        { value: 'UserLocationEvent', text: 'UserLocationEvent' },
        { value: 'SearchResultEvent', text: 'SearchResultEvent' },
        { value: 'RouteResultEvent', text: 'RouteResultEvent' }
      ],
      select: 'Getting Started',
      selected: 'Getting Started'
    }
  },
  methods: {
    getSelectedInfo (event) {
      this.$parent.asd(event);
      this.$store.state.rpcExample = event.target.value;
      // this.$store.state.rpcExample.text = event.target.selectedOptions[0].innerText;
      this.$store.state.examplesViewed.push(event.target.value);
    }
  },
  updated () {
    // this.select = this.selected
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
