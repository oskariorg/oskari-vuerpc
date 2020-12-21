import gettingStarted from './GettingStarted.vue';
import map from './map';
import marker from './marker';
import features from './features';
import drawing from './drawing';
import generic from './generic';
import feedback from './feedback';
import ui from './ui';
import location from './location';

const pageMap = {
    main: gettingStarted,
    sections: [
        map,
        marker,
        features,
        drawing,
        generic,
        feedback,
        ui,
        location
    ]
};

export default pageMap;
