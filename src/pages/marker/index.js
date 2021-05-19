import markerAdd from '../../components/requests/marker.add.vue';
import markerShow from '../../components/requests/marker.show.vue';
import markerInfobox from '../../components/requests/marker.infobox.vue';
import markerAfterAdd from '../../components/events/marker.added.vue';
import markerClicked from '../../components/events/marker.clicked.vue';

export default {
  name: 'Markers',
  pages: [
    markerAdd,
    markerShow,
    markerInfobox,
    markerAfterAdd,
    markerClicked
  ]
};
