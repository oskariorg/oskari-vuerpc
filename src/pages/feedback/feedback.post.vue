<template>
  <div id="feedback">
    <div id="PostFeedbackRequest">
      <div style="display: block">
        <button id="point" class="btn btn-primary exampleready" @click="postFeedbackRequest">
          PostFeedbackRequest Point
        </button>
        <div>Request feedback data</div>
      </div>
      <div>
        <a ref="postFeedback" href="" @click="getLink">To the documentation</a>
      </div>

      <CodeSnippet>{{ one }}</CodeSnippet>
    </div>
    <div id="PostFeedbackRequest">
      <div style="display: block">
        <button id="line" class="btn btn-primary exampleready" @click="postFeedbackRequest">
          PostFeedbackRequest Line
        </button>
        <div>Request feedback data</div>
      </div>
      <div>
        <a ref="postFeedback" href="" @click="getLink">To the documentation</a>
      </div>

      <CodeSnippet>{{ two }}</CodeSnippet>
    </div>
    <div id="PostFeedbackRequest">
      <div style="display: block">
        <button id="polygon" class="btn btn-primary exampleready" @click="postFeedbackRequest">
          PostFeedbackRequest Polygon
        </button>
        <div>Request feedback data</div>
      </div>
      <div>
        <a ref="postFeedback" href="" @click="getLink">To the documentation</a>
      </div>

      <CodeSnippet>{{ three }}</CodeSnippet>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PostFeedbackRequest',
  label: 'Post users feedback data (poc)',
  data() {
    return {
      desc: 'Post users feedback data (poc)',
      one: feedback.one,
      two: feedback.two,
      three: feedback.three
    };
  },
  methods: {
    postFeedbackRequest(event) {
      let postdata = {};
      let data = {};
      switch (event.target.id) {
        case 'point':
          this.$root.channel.getMapPosition((pdata) => {
            postdata = {
              service_code: '180',
              description: 'Kampin bussipysäkillä on roskakori täynnä',
              first_name: 'Point',
              last_name: 'POC',
              lat: pdata.centerY,
              long: pdata.centerX
            };
            data = {
              srs: 'EPSG:3067',
              payload: postdata
            };
            this.$root.channel.postRequest('PostFeedbackRequest', [data]);
            this.$root.channel.log('PostFeedbackRequest posted with data', [data]);
          });
          break;
        case 'line':
          postdata = {
            service_code: '180',
            description: 'Vartiosaari kaipaa suojelua',
            first_name: 'Line',
            last_name: 'POC',
            geometry: {
              type: 'LineString',
              coordinates: [
                [393000, 6673192],
                [393216, 6673560],
                [393712, 6673864],
                [393736, 6673592]
              ]
            }
          };
          data = {
            srs: 'EPSG:3067',
            payload: postdata
          };
          this.$root.channel.postRequest('PostFeedbackRequest', [data]);
          this.$root.channel.log('PostFeedbackRequest posted with data', [data]);
          break;
        case 'polygon':
          postdata = {
            service_code: '180',
            description: 'Savua ilmassa',
            first_name: 'Polygon',
            last_name: 'POC',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [382472.5, 6677324.5],
                  [382328.5, 6676636.5],
                  [383288.5, 6676332.5],
                  [383528.5, 6677100.5],
                  [382472.5, 6677324.5]
                ]
              ]
            }
          };
          data = {
            srs: 'EPSG:3067',
            payload: postdata
          };
          this.$root.channel.postRequest('PostFeedbackRequest', [data]);
          this.$root.channel.log('PostFeedbackRequest posted with data', [data]);
          break;
        default:
      }
    },
    getLink(e) {
      var documentPathEnd = 'mapping/feedbackService/request/postfeedbackrequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
};

const feedback = {
  one: `  var postdata = {
    "service_code": "180",
    "description": "Kampin bussipysäkillä on roskakori täynnä",
    "first_name": "Oskari",
    "last_name": "Maanmittaushallitus",
    "lat": "6674188.748000",
    "long": "384717.640000"
  };
  var data = {
    "srs": "EPSG:3067",
    "payload": postdata
  };
  channel.postRequest('PostFeedbackRequest', [data]);`,
  two: `var postdata = {
    "service_code": "180",
    "description": "Vartiosaari kaipaa suojelua",
    "first_name": "Line",
    "last_name": "POC",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [393000, 6673192],
        [393216, 6673560],
        [393712, 6673864],
        [393736, 6673592]
      ]
    }
  };
  var data = {
    "srs": "EPSG:3067",
    "payload": postdata
  };
  channel.postRequest('PostFeedbackRequest', [data]);`,
  three: `var postdata = {
    "service_code": "180",
    "description": "Kampin bussipysäkillä on roskakori täynnä",
    "first_name": "Oskari",
    "last_name": "Maanmittaushallitus",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [382472.5, 6677324.5],
          [382328.5, 6676636.5],
          [383288.5, 6676332.5],
          [383528.5, 6677100.5],
          [382472.5, 6677324.5]
        ]
      ]
    }
  };
  var data = {
    "srs": "EPSG:3067",
    "payload": postdata
  };
  channel.postRequest('PostFeedbackRequest', [data]);`,
};
</script>
