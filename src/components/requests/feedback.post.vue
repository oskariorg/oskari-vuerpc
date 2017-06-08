<template>
  <div id="feedback">
    <div id="PostFeedbackRequest">
      <div style="display: block;">
        <button id="point" class="btn btn-primary exampleready" @click="postFeedbackRequest" >PostFeedbackRequest Point </button>
        <div>Request feedback data</div>
      </div>
      <div>
        <a id="postFeedback" href="">To the documentation</a>
      </div>

      <code-component :snippet="one"></code-component>

    </div>
    <div id="PostFeedbackRequest">
      <div style="display: block;">
        <button id="line" class="btn btn-primary exampleready" @click="postFeedbackRequest" >PostFeedbackRequest Line</button>
        <div>Request feedback data</div>
      </div>
      <div>
        <a id="postFeedback" href="">To the documentation</a>
      </div>

      <code-component :snippet="two"></code-component>
    </div>
    <div id="PostFeedbackRequest">
      <div style="display: block;">
        <button id="polygon" class="btn btn-primary exampleready" @click="postFeedbackRequest">PostFeedbackRequest Polygon</button>
        <div>Request feedback data</div>
      </div>
      <div>
        <a id="postFeedback" href="">To the documentation</a>
      </div>

      <code-component :snippet="three"></code-component>
    </div>
  </div>
</template>
<script>
import { feedback } from '../../util/examplecodes.js';
export default {
  name: 'PostFeedbackRequest',
  data () {
    return {
      desc: 'Post users feedback data (poc)',
      one: feedback.one,
      two: feedback.two,
      three: feedback.three
    }
  },
  methods: {
    postFeedbackRequest (event) {
      switch (event.target.id) {
        case 'point':
          this.$root.channel.getMapPosition((pdata) => {
            const postdata = {
              'service_code': '180',
              'description': 'Kampin bussipysäkillä on roskakori täynnä',
              'first_name': 'Point',
              'last_name': 'POC',
              'lat': pdata.centerY,
              'long': pdata.centerX
            };
            const data = {
              'srs': 'EPSG:3067',
              'payload': postdata
            };
            this.$root.channel.postRequest('PostFeedbackRequest', [data]);
            this.$root.channel.log('PostFeedbackRequest posted with data', [data]);
          });
          break;
        case 'line':
          let postdata = {
            'service_code': '180',
            'description': 'Vartiosaari kaipaa suojelua',
            'first_name': 'Line',
            'last_name': 'POC',
            'geometry': {
              'type': 'LineString',
              'coordinates': [[393000, 6673192], [393216, 6673560], [393712, 6673864], [393736, 6673592]] }
          };
          let data = {
            'srs': 'EPSG:3067',
            'payload': postdata
          };
          this.$root.channel.postRequest('PostFeedbackRequest', [data]);
          this.$root.channel.log('PostFeedbackRequest posted with data', [data]);
          break;
        case 'polygon':
          postdata = {
            'service_code': '180',
            'description': 'Savua ilmassa',
            'first_name': 'Polygon',
            'last_name': 'POC',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[382472.5, 6677324.5], [382328.5, 6676636.5], [383288.5, 6676332.5], [383528.5, 6677100.5], [382472.5, 6677324.5]]] }
          };
          data = {
            'srs': 'EPSG:3067',
            'payload': postdata
          };
          this.$root.channel.postRequest('PostFeedbackRequest', [data]);
          this.$root.channel.log('PostFeedbackRequest posted with data', [data]);
          break;
        default:
      }
    }
  }
}
    </script>
