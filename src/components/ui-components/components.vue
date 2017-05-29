<template>
  <div>
    <div class="navigationLinkParent">
      <div class="navigationLinkLeft"><a class="navigationLink"  :id="neighbourLeft"  @click="changeComponent">Previous: {{neighbourLeft}}</a></div>
      <div class="navigationLinkRight"><a class="navigationLink" :id="neighbourRight" @click="changeComponent">Next: {{neighbourRight}}</a></div>
    </div>
  </br>
  <transition name="fade">
    <component :id="selected.func" :is="currentView" transition="fade" transition-mode="out-in"></component>
  </transition>
</div>
</template>

<script>
import gettingStarted from '../GettingStarted.vue';
// events
import AfterMapMoveEvent from '../events/map.aftermove.vue';
import MapClickedEvent from '../events/map.clicked.vue';
import DrawingEvent from '../events/drawing.event.vue';
import FeatureEvent from '../events/feature.event.vue';
import FeedbackResultEvent from '../events/feedback.result.vue';
import AfterAddMarkerEvent from '../events/marker.afteradd.vue';
import MarkerClickEvent from '../events/marker.clicked.vue';
import RouteResultEvent from '../events/route.result.vue';
import SearchResultEvent from '../events/search.result.vue';
import UserLocationEvent from '../events/user.location.vue';
// requests
import GetRouteRequest from '../requests/route.get.vue';
import GetFeedbackServices from '../requests/feedback.services.vue';
import GetFeedbackRequest from '../requests/feedback.request.vue';
import PostFeedbackRequest from '../requests/feedback.post.vue';
import ShowInfoBox from '../requests/infobox.request.vue';
import ShowInfoBoxForMarker from '../requests/marker.infobox.vue';
import AddMarkerRequest from '../requests/marker.add.vue';
import showOrHideMarkers from '../requests/marker.show.vue';
import MapMoveRequest from '../requests/map.move.vue';
import rotateMap from '../requests/rotate.map.vue';
import MapLayerUpdateRequest from '../requests/maplayer.update.vue';
import MapLayerOpacityRequest from '../requests/maplayer.opacity.vue';
import GetUserLocationRequest from '../requests/user.location.vue';
import ShowProgressSpinnerRequest from '../requests/ui.progresspinner.vue';
import SearchRequest from '../requests/search.vue';
import drawing from '../requests/drawing.vue';
import GetFeatureInfoRequest from '../requests/features.info.vue';
import updateFeatures from '../requests/features.update.vue';
import addOrRemoveFeatures from '../requests/features.add.vue';
import ZoomToFeatures from '../requests/features.zoom.vue';
import LayerVisibility from '../requests/maplayer.visibility.vue';
// functions
import GetAllLayers from '../functions/layers.vue';
import GetMapPosition from '../functions/map.position.vue';
import GetSupportedEvents from '../functions/supported.events.vue';
import GetSupportedFunctions from '../functions/supported.functions.vue';
import GetSupportedRequests from '../functions/supported.requests.vue';
import mapZoomFunctions from '../functions/map.zoom.vue';
import GetPixelMeasuresInScale from '../functions/map.pixelmeasures.vue';
import GetMapBbox from '../functions/map.bbox.vue';
import stateHandling from '../functions/map.state.vue';
import GetFeatures from '../functions/features.vue';
import GetScreenshot from '../functions/map.screenshot.vue';
import SendUIEvent from '../functions/ui.sendevent.vue';
import setCursorStyle from '../functions/ui.cursor.vue';

import { mapGetters } from 'vuex';

export default {
  computed: {
    // mapgetters is a helper to return your getter functions from the store
    ...mapGetters({
      selected: 'selectedExample',
      viewed: 'totalViewed'
    })
  },
  data () {
    return {
      comps: [
        AfterMapMoveEvent,
        MapClickedEvent,
        DrawingEvent,
        FeatureEvent,
        FeedbackResultEvent,
        AfterAddMarkerEvent,
        MarkerClickEvent,
        RouteResultEvent,
        SearchResultEvent,
        UserLocationEvent,
        GetRouteRequest,
        GetFeedbackServices,
        GetFeedbackRequest,
        PostFeedbackRequest,
        ShowInfoBox,
        ShowInfoBoxForMarker,
        AddMarkerRequest,
        showOrHideMarkers,
        MapMoveRequest,
        MapLayerUpdateRequest,
        MapLayerOpacityRequest,
        rotateMap,
        GetUserLocationRequest,
        ShowProgressSpinnerRequest,
        SearchRequest,
        drawing,
        GetFeatureInfoRequest,
        updateFeatures,
        addOrRemoveFeatures,
        ZoomToFeatures,
        LayerVisibility,
        gettingStarted,
        GetAllLayers,
        GetMapPosition,
        GetSupportedEvents,
        GetSupportedFunctions,
        GetSupportedRequests,
        mapZoomFunctions,
        GetPixelMeasuresInScale,
        GetMapBbox,
        stateHandling,
        GetFeatures,
        GetScreenshot,
        SendUIEvent,
        setCursorStyle
      ],
      neighbourLeft: '',
      neighbourRight: '',
      currentView: gettingStarted
    }
  },
  methods: {
    updateView () {
      for (let i = 0; i < this.comps.length; i++) {
        if (this.comps[i].name === this.selected) {
          this.currentView = this.comps[i];
        }
      }
    },
    calcNeighbors () {
      for (let i = 0; i < this.comps.length; i++) {
        if (this.comps[i].name === this.selected) {
          if (i === 0) {
            this.neighbourLeft = '';
          } else {
            this.neighbourLeft = this.comps[i - 1].name;
          }
          if (i === this.comps.length - 1) {
            this.neighbourRight = '';
          } else {
            this.neighbourRight = this.comps[i + 1].name;
          }
        }
      }
    },
    changeComponent (e) {
      this.$store.state.rpcExample = e.target.id;
      this.updateView();
    }
  },
  updated () {
    this.updateView();
    this.calcNeighbors();
  },
  mounted () {
    this.updateView();
    this.calcNeighbors();
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .15s;
}

.fade-enter-active {
  transition-delay: .15s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
.navigationLinkLeft {
  display:inline-block;
  left:0;
  width:50%;
}
.navigationLinkRight {
  display:inline-block;
  right: 0;
}
</style>
