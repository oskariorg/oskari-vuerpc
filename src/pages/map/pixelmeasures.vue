<template>
  <div>
    <h2>{{ title }}</h2>
    
    <p>getPixelMeasuresInScale() function on the RPC API client can be
       used to get the pixel measures for given real life object like
       an A4 size paper sheet. This is useful for showing the end user
       what part of the map fits in the paper sheet when using a given scale.
    </p>

    <DocumentationLink type="bundle" :apiDoc="apiDocPage">Documentation for RPC functions</DocumentationLink>
    <p>
      <input v-model="scale" class="plot-scale-control" placeholder="Plot scale for A4 plot area">
      <RunExampleButton @click="getPixelMeasuresInScale">Show A4 plot area on a map</RunExampleButton>
      
      Get pixel measures for A4 size plot area in the requested scale. 
      Remove box by setting value to 0 or zooming in/out.
    </p>
    <CodeSnippet>
var A4_size_mm = {{ JSON.stringify(A4_size_mm) }};
channel.getPixelMeasuresInScale([A4_size_mm, {{ scale }}], function (data) {
  channel.log('GetPixelMeasuresInScale: ', data);
});
    </CodeSnippet>
  </div>
</template>

<script>
import EVENTBUS from '../../util/eventbus';

const apiDocPage = 'framework/rpc';
const title = 'Get pixel measures in scale';
const A4_size_mm = [210, 297];
const BOX_ID = 'id_plot_bbox';
const MAP_ID = 'publishedMap';
// listeners is references to event listeners registered
// by this example so we can remove them when the user leaves the page
const listeners = [];
// current scale is used to cleanup existing box if user zooms
let currentScale;

export default {
  name: 'GetPixelMeasuresInScale',
  label: title,
  data () {
    return {
      title,
      apiDocPage,
      A4_size_mm,
      scale: 500000
    }
  },
  watch: {
    scale (value) {
      this.scale = value;
    }
  },
  methods: {
    getPixelMeasuresInScale () {
      const channel = this.$root.channel;
      const userInput = Number(this.scale);
      if (userInput < 1) {
        if (removeBox()) {
          channel.log('Removed plot area');
        }
        return;
      }
      
      channel.getPixelMeasuresInScale([A4_size_mm, userInput], (data) => {
        channel.log('GetPixelMeasuresInScale: ', data);
        const success = drawBoxOnMap(data.pixelMeasures[0], data.pixelMeasures[1]);
        if (!success) {
          channel.log('Map is smaller than printable area. Area not shown. Zoom out and try again.');
        }
      });
    }
  },
  mounted () {
    const channel = this.$root.channel;
    channel.getMapPosition((data) => {
        // initialize current scale when mounted
        currentScale = data.scale;
    });
    listeners.push(EVENTBUS.on('AfterMapMoveEvent', (data) => {
      if (currentScale !== data.scale) {
        // wipe box if scale changes as the box should be redrawn
        // TODO: current scale is not initialized if the user haven't moved the map
        currentScale = data.scale;
        removeBox();
      }
    }));
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    removeBox();
    while (listeners.length) {
      EVENTBUS.off('AfterMapMoveEvent', listeners.pop());
    }
  }
}

const removeBox = () => {
  const boxEl = document.getElementById(BOX_ID);
  if (!boxEl) {
    // return false to notify caller there wasn't a box to be removed
    return false;
  }
  boxEl.remove();
  return true;
}

const drawBoxOnMap = (width, height) => {
  // clean up previous one
  removeBox();
  const mapEl = document.getElementById(MAP_ID);
  const bounds = mapEl.getBoundingClientRect();
  const boxTop = bounds.top + (mapEl.offsetHeight - height) / 2.0;
  const boxLeft = bounds.left + (mapEl.offsetWidth - width) / 2.0;
  if (mapEl.clientWidth < width ||
    mapEl.clientHeight < height) {
      // sanity check if the box is larger than the map element
      // -> don't draw it and return false to notify caller that box wasn't added
    return false;
  }
  if (boxLeft <= 0 || boxTop <= 0) {
    // nothing to draw
    return false;
  }
  const box = document.createElement('div');
  box.id = BOX_ID;
  box.style = `overflow: hidden;
          pointer-events:none;
          position:absolute;
          top:${boxTop - 35}px;
          left:${boxLeft}px;
          width:${width}px;
          height:${height}px; 
          border:2px solid red`;
  mapEl.parentElement.appendChild(box);
  return true;
};

</script>
