<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Drawing requests can be used to mark down and measure different locations on the map. With
      different settings you can set the behaviour of the request from drawing different plain
      pre-defined shapes to drawing custom styled measurement of the marked area. These pre-defined
      shapes consist of shapes like polygon, circle, point, box, square or line. <br /><br />
      To start drawing, select a shape and send a <InlineCode>StartDrawingRequest</InlineCode>.
      <br />
    </p>
    <div>
      <b-dd :text="selectedShape" variant="outline-success">
        <b-dd-item-button @click="setShape('Polygon')">Polygon</b-dd-item-button>
        <b-dd-item-button @click="setShape('Point')">Point</b-dd-item-button>
        <b-dd-item-button @click="setShape('Circle')">Circle</b-dd-item-button>
        <b-dd-item-button @click="setShape('Box')">Box</b-dd-item-button>
        <b-dd-item-button @click="setShape('Square')">Square</b-dd-item-button>
        <b-dd-item-button @click="setShape('LineString')">LineString</b-dd-item-button>
      </b-dd>
    </div>
    <br />
    <DocumentationLink type="request" apiDoc="mapping/drawtools/request/startdrawingrequest.md">
      Documentation for DrawTools.StartDrawingRequest
    </DocumentationLink>
    <CodeSnippet :runnable="true" buttonText="Activate drawing mode">
var data = ['my functionality id', '{{ selectedShape }}'];
channel.postRequest('DrawTools.StartDrawingRequest', data);
    </CodeSnippet>
    To start drawing with measurement turned on, send drawing request with options parameter as
    object containing <InlineCode>showMeasureOnMap</InlineCode> as true.
    <CodeSnippet :runnable="true" buttonText="Activate drawing mode with measurement">
var data = ['my functionality id', '{{ selectedShape }}', { showMeasureOnMap: true }];
channel.postRequest('DrawTools.StartDrawingRequest', data);
    </CodeSnippet>
    
    <p>
      To stop the current drawing progress send a <InlineCode>StopDrawingRequest</InlineCode> with
      id of the feature to stop drawing for as a parameter. For accessability reasons it isn't
      recommended that <InlineCode>StopDrawingRequest</InlineCode> is initiated by double clicking
      map area but rather by placing dedicated button in the UI of application being developed.<br />
      <DocumentationLink type="request" apiDoc="mapping/drawtools/request/stopdrawingrequest.md">
        Documentation for DrawTools.StopDrawingRequest
      </DocumentationLink>
      <CodeSnippet :runnable="true" buttonText="Disable drawing mode">
var data = ['my functionality id'];
channel.postRequest('DrawTools.StopDrawingRequest', data);
      </CodeSnippet>
    </p>

    <p>
      To clear a drawing from the map send a <InlineCode>StopDrawingRequest</InlineCode> with second
      member of data parameter given to <InlineCode>StopDrawingRequest</InlineCode> set as
      <InlineCode>true</InlineCode>.
      <CodeSnippet :runnable="true" buttonText="Clear drawings">
var data = ['my functionality id', true];
channel.postRequest('DrawTools.StopDrawingRequest', data);
      </CodeSnippet>
    </p>

    <p>
      Everytime the cursor is moved on the map <InlineCode>DrawingEvent</InlineCode> occurs while
      drawing is in progress and contains all the information regarding current drawing. To ensure
      that logging isn't clogged check if <InlineCode>DrawingEvent.finished</InlineCode> is set to
      <InlineCode>true</InlineCode> and only log when drawing is finished.
      <br />
      <DocumentationLink type="event" apiDoc="mapping/drawtools/event/DrawingEvent.md">
        Documentation for DrawingEvent
      </DocumentationLink>
      <CodeSnippet>
{
  "name": "DrawingEvent",
  "id": "my functionality id",
  "geojson": {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                429245.623,
                7349501.146
              ],
              [
                158909.62300000002,
                7081213.146
              ],
              [
                597181.623,
                6853885.146
              ],
              [
                429245.623,
                7349501.146
              ]
            ]
          ]
        },
        "properties": {
          "area": 87187682917.60973
        },
        "id": "drawFeature0"
      }
    ],
    "crs": "EPSG:3067"
  },
  "data": {
    "buffer": 0,
    "bufferedGeoJson": {
      "type": "FeatureCollection",
      "features": []
    },
    "shape": "Polygon",
    "area": 87187682917.60973
  },
  "isFinished": true
}
      </CodeSnippet>
    </p>
  </div>
</template>
<script>
const title = 'Drawing requests';
const featureId = 'my functionality id';

export default {
  name: 'drawingExample',
  label: title,
  data() {
    return {
      title,
      selectedShape: 'Polygon'
    };
  },
  beforeUnmount() {
    const data = [featureId, true];
    this.$root.channel.postRequest('DrawTools.StopDrawingRequest', data);
    this.$root.channel.log('DrawTools.StopDrawingRequest posted with data:', data);
  },
  methods: {
    setShape(shape) {
      this.selectedShape = shape;
    }
  }
};
</script>
